import React from "react";
import products from "../products";
import Product from "../components/Product";
import { Typography, Grid, Container } from "@mui/material";
import Filter from "../components/Filter";

const ProductsPage = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container>
        <Grid item xs={2}>
          <Filter />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h5" sx={{ pt: 6, pb: 2 }}>
            PRODUCTS
          </Typography>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid key={product._id} item xs={6} sm={4} md={3}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductsPage;
