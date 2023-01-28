import React from "react";
import { AppBar, Toolbar, Typography, Box, TextField } from "@mui/material";
import { Login, ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar sx={{ backgroundColor: "#282C34" }}>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            flexDirection: { xs: "column", sm: "row" },
            mt: 2,
            mb: 2,
          }}
        >
          <Typography
            component={Link}
            to={"/"}
            variant="h6"
            sx={{ mr: "auto", textDecoration: "none", color: "white" }}
          >
            xxx
          </Typography>
          <TextField
            size="small"
            sx={{
              backgroundColor: "white",
              border: 0,
              mr: 2,
            }}
            id="search"
            variant="outlined"
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <ShoppingCart />
            <Typography
              variant="body1"
              sx={{ mr: 2, ml: 1, textDecoration: "none", color: "white" }}
            >
              cart
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Login />
            <Typography
              variant="body1"
              sx={{ mr: 2, ml: 1, textDecoration: "none", color: "white" }}
            >
              login
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
