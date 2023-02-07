import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
// import Ratings from "./Ratings";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        maxWidth: 288,
        height: 288,
        display: "flex",
        flexDirection: "column",
      }}
      key={product._id}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={product.productImages[0].url_string}
        component={Link}
        to={`/products/${product.id}`}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="body2"
          component={Link}
          to={`/products/${product.id}`}
          sx={{ textDecoration: "none", color: "black" }}
        >
          {product.name}
        </Typography>
        {/* <Ratings
          value={product.rating}
          text={`${product.numReviews} reviews`}
        /> */}
        <Typography variant="body1" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>

      <CardActions sx={{ mt: "auto" }}>
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "#282C34" }}
          onClick={() => navigate(`/products/${product.id}`)}
        >
          Detail
        </Button>

        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "#282C34" }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
