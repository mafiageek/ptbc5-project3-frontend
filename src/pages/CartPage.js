import {
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableRow,
} from "@mui/material";
import React from "react";
import { useCart } from "../context/cart";
import { Delete } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CartPage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const handleDelete = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    localStorage.setItem("cart", JSON.stringify([...cart]));
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/order");
    } else {
      toast.error("Please login");
    }
  };

  const handleLogin = async () => {
    loginWithRedirect().then(() => {
      if (isAuthenticated) {
        navigate("/order");
      }
    });
  };

  console.log(cart);
  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Typography variant="h6" sx={{ pl: 2 }}>
        CART
      </Typography>
      <Stack direction="row">
        <Stack direction="column">
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableBody>
                {cart.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        width="100"
                        src={product.productImages[0]?.urlString}
                        alt="product"
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(product.id)}
                        size="small"
                        variant="filled"
                      >
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        <Stack sx={{ pl: 2, ml: 4 }}>
          <TableContainer component={Paper}>
            <Table sx={{ width: 200 }}>
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    TOTAL <strong>{cart.length}</strong> ITEMS
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
                  {isAuthenticated ? (
                    <TableCell align="center">
                      <Button
                        onClick={handleCheckout}
                        size="small"
                        variant="contained"
                        sx={{ backgroundColor: "#282C34" }}
                      >
                        CHECKOUT
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell align="center">
                      <Button
                        onClick={handleLogin}
                        size="small"
                        variant="contained"
                        sx={{ backgroundColor: "#282C34" }}
                      >
                        LOGIN TO CHECKOUT
                      </Button>
                    </TableCell>
                  )}
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
