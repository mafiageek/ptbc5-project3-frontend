import React, { useState, useEffect } from "react";
// import products from "../products";
import Product from "../components/Product";
import { Typography, Grid, Container } from "@mui/material";
import Filter from "../components/Filter";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [filterCategory, setFilterCategory] = useState(category);

  const [query, setQuery] = useState("");
  const keys = ["name", "brand", "description"];
  const search = (data) => {
    return data?.filter((item) =>
      keys?.some((key) => item[key]?.toLowerCase().includes(query))
    );
  };

  const [maxPrice, setMaxPrice] = useState(5000);

  const [filterPrice, setFilterPrice] = useState(maxPrice);

  useEffect(
    () => {
      axios.get("http://localhost:3001/categories").then(({ data }) => {
        setCategory(data);
      });

      axios.get("http://localhost:3001/products").then(({ data }) => {
        setMaxPrice(Math.max(...data.map((item) => item.price)));
        setProducts(data.filter((item) => item.price <= filterPrice));
      });
    },
    [filterPrice],
    [category]
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container>
        <Grid item xs={2}>
          <Filter
            setQuery={setQuery}
            setFilterPrice={setFilterPrice}
            filterPrice={filterPrice}
            maxPrice={maxPrice}
            category={category}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h5" sx={{ pt: 6, pb: 2 }}>
            PRODUCTS
          </Typography>
          <Grid container spacing={2}>
            {search(products).map((product) => (
              <Grid key={product.id} item xs={6} sm={4} md={3}>
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
