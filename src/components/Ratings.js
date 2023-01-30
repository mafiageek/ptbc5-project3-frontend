import React from "react";
import { Box, Rating, Typography } from "@mui/material";

const Ratings = ({ value, text }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Rating name="simple-controlled" value={value} />
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
};

export default Ratings;
