import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  ButtonGroup,
  Button,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/products/${id}`).then(() => {
      axios.get(`http://localhost:3001/products`).then(({ data }) => {
        setProducts(data);
      });
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/products`).then(({ data }) => {
      setProducts(data);
    });
  }, []);

  return (
    <Container sx={{ mt: 10 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">PRODUCTS</Typography>
        <Button
          variant="contained"
          size="small"
          sx={{ background: "black" }}
          onClick={() => navigate("/addproduct")}
        >
          ADD PRODUCT
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell align="center">BRAND</TableCell>
              <TableCell align="center">PRICE</TableCell>
              <TableCell align="center">STOCK</TableCell>
              <TableCell align="center">CATEGORY</TableCell>
              <TableCell align="center">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">{product.stock}</TableCell>
                <TableCell align="center">{product.categoryId}</TableCell>
                <TableCell>
                  {" "}
                  <ButtonGroup variant="text">
                    <Button
                      variant="filled"
                      onClick={() => navigate(`/updateproduct/${product.id}`)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="filled"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Delete />
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminPage;
