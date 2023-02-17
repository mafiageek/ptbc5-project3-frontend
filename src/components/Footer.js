import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        bottom: 0,
        position: "fixed",
        backgroundColor: "#282C34",
        height: 40,
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Typography variant="body2" align="center" sx={{ color: "whitesmoke" }}>
        kedai bodega &copy; 2023
      </Typography>
    </Box>
  );
};

export default Footer;
