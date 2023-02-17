import React, { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  IconButton,
  Button,
  Badge,
  Avatar,
} from "@mui/material";
import { CatchingPokemonOutlined } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart] = useCart();
  const { isAuthenticated, loginWithRedirect, user, logout } = useAuth0();
  const [currentUser, setCurrentUser] = useState({});

  const handleLogin = async () => {
    loginWithRedirect()
      .then(() => {
        console.log("locationState", location.state);
        navigate(location.state);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`http://localhost:3001/users?email=${user.email}`)
        .then(({ data }) => {
          setCurrentUser({
            id: data[0].id,
            role: data[0].role,
          });
          if (data.length === 0) {
            axios.post(`http://localhost:3001/users`, {
              name: user.name,
              role: "user",
              email: user.email,
              uid: user.sub,
            });
          }
        });
    }
  }, [isAuthenticated, user?.email, user?.name, user?.sub]);

  console.log(currentUser);
  const handleLogout = async () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <AppBar sx={{ backgroundColor: "#282C34" }}>
      <Toolbar>
        <IconButton>
          <CatchingPokemonOutlined sx={{ color: "white" }} />
        </IconButton>
        <Typography
          variant="h6"
          component={Link}
          to={"/products"}
          sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
        >
          Shop
        </Typography>
        <Stack direction="row" space={2}>
          {/* <Button color="inherit" onClick={() => navigate("/products")}>
            Shop
          </Button> */}
          <Button color="inherit" onClick={() => navigate("/cart")}>
            <Badge badgeContent={cart.length} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </Button>
          {!isAuthenticated && (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
          {currentUser?.role === "user" && (
            <Button color="inherit" onClick={() => navigate("/dashboard")}>
              DASHBOARD
            </Button>
          )}
          {currentUser?.role === "admin" && (
            <Button color="inherit" component={Link} to={"/admin"}>
              Admin
            </Button>
          )}
          {isAuthenticated && (
            <>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              <Avatar src={user.picture} sx={{ ml: 2 }} />
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
