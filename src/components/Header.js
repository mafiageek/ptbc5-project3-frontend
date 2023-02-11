import React from "react";
import { useCart } from "../context/cart";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  IconButton,
  Button,
  Badge,
} from "@mui/material";
import { CatchingPokemonOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@mui/icons-material";

const Header = () => {
  const navigate = useNavigate();
  const [cart] = useCart();
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
          <Button color="inherit">Login</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
