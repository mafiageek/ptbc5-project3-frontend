import React, { useEffect } from "react";
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
    if (user) {
      axios
        .get(`http://localhost:3001/users?email=${user.email}`)
        .then(({ data }) => {
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
  }, [user]);

  console.log(user);
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
          to={"/"}
          sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
        >
          Home
        </Typography>
        <Stack direction="row" space={2}>
          <Button color="inherit" onClick={() => navigate("/products")}>
            Shop
          </Button>
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
          {isAuthenticated && (
            <>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              <Avatar src={user.picture} />
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
