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
import Ratings from "./Ratings";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 288, height: 328 }} key={product._id}>
      <CardMedia
        sx={{ height: 140 }}
        image={product.image}
        component={Link}
        to={`/product/${product._id}`}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="body1"
          component={Link}
          to={`/product/${product._id}`}
          sx={{ textDecoration: "none", color: "black" }}
        >
          {product.name}
        </Typography>
        <Ratings
          value={product.rating}
          text={`${product.numReviews} reviews`}
        />
        <Typography variant="h6" color="text.secondary">
          {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "#282C34" }}
          onClick={() => navigate(`/product/${product._id}`)}
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
