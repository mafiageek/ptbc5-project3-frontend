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
import { useCart } from "../context/cart";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const handleCart = (product) => {
    setCart([...cart, { ...product, stock: 1 }]);
    localStorage.setItem(
      "cart",
      JSON.stringify([...cart, { ...product, stock: 1 }])
    );
  };
  // console.log(product.productImages[0]?.urlString);
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      key={product.id}
    >
      <CardMedia
        sx={{ height: 160, objectFit: "contain" }}
        image={product.productImages[0]?.urlString}
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
          sx={{ backgroundColor: "#282C34", m: 1 }}
          onClick={() => navigate(`/products/${product.id}`)}
        >
          Detail
        </Button>

        <Button
          onClick={() => handleCart(product)}
          size="small"
          variant="contained"
          sx={{ backgroundColor: "#282C34", m: 1 }}
          disabled={product.stock === 0}
        >
          + Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
