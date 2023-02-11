import {
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  Paper,
  TableRow,
} from "@mui/material";
import React from "react";
import { useCart } from "../context/cart";

const CartPage = () => {
  const [cart, setCart] = useCart();

  const handleDelete = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    localStorage.setItem("cart", JSON.stringify([...cart]));
  };

  console.log(cart);
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h6">SHOPPING CART</Typography>
      <Stack direction="row">
        <Stack direction="column">
          {cart.map((product) => (
            <Grid
              container
              spacing={2}
              key={product.id}
              sx={{ alignItems: "center", mt: 1 }}
              component="paper"
            >
              <Grid item sm={1}>
                {console.log(product.productImages[0].url_string)}
                <img
                  width="100%"
                  src={product.productImages[0].url_string}
                  alt="product"
                />
              </Grid>
              <Grid item sm={4}>
                {product.name}
              </Grid>
              <Grid item sm={2}>
                ${product.price}
              </Grid>
              <Grid item sm={1}>
                {product.stock}
              </Grid>
              <Grid item sm={2}>
                <Button
                  onClick={() => handleDelete(product.id)}
                  size="small"
                  variant="contained"
                  sx={{ background: "black" }}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          ))}
        </Stack>
        <Stack>
          <TableContainer
            component={Paper}
            sx={{ width: 200, mr: "auto", mt: 2 }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    TOTAL {cart.length} ITEMS
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    $
                    {cart?.reduce((accumulator, object) => {
                      return accumulator + Number(object.price);
                    }, 0)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ backgroundColor: "#282C34" }}
                    >
                      CHECKOUT
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </Container>
  );
};

export default CartPage;
