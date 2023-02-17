import React, { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
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
  List,
  ListItem,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import toast from "react-hot-toast";

const OrderPage = () => {
  const { user } = useAuth0();
  const [address, setAddress] = useState({
    userId: "",
    id: "",
    address: "",
    city: "",
    postal: "",
    country: "",
  });
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/addresses?email=${user?.email}`)
      .then(({ data }) => {
        setAddress({
          userId: data[0].userId,
          id: data[0].id,
          address: data[0].addressLine1,
          city: data[0].city,
          postal: data[0].postal,
          country: data[0].country,
        });
      });
  }, [user?.email]);

  const handleOrder = () => {
    axios
      .post(`http://localhost:3001/orders`, {
        userId: address.userId,
        userAddressId: address.id,
        total: total,
        orderStatus: "paid",
      })
      .then(({ data }) => {
        cart.map((item) =>
          axios.post(`http://localhost:3001/orderItems`, {
            orderId: data.id,
            productId: item.id,
            quantity: item.stock,
          })
        );
      })
      .then(() => {
        toast.success("Thank you for your purchase");
        localStorage.removeItem("cart");
        setCart("");
        navigate("/products");
      });
  };

  const total = cart?.reduce((accumulator, object) => {
    return accumulator + Number(object.price);
  }, 0);

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Stack direction="row">
        <Stack direction="column">
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {/* <Stack direction="column" spacing={1}>
                      {addresses?.map((a) => (
                        <TextField value={a.addressLine1} />
                      ))}
                    </Stack> */}
                    <Typography variant="h6">SHIPPING</Typography>
                    <Stack direction="row" spacing={1} sx={{ p: 1 }}>
                      <Stack component={Paper} sx={{ minWidth: 250 }}>
                        <List>
                          <ListItem>{address.address}</ListItem>
                          <ListItem>{address.city}</ListItem>
                          <ListItem>{address.postal}</ListItem>
                          <ListItem>{address.country}</ListItem>
                        </List>
                      </Stack>
                      <Stack direction="column">
                        {address ? (
                          <Button
                            onClick={() =>
                              navigate(`/updateaddress/${address.id}`, {
                                state: "/order",
                              })
                            }
                            size="small"
                            variant="contained"
                            sx={{ backgroundColor: "#282C34", m: 1 }}
                          >
                            Edit
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            variant="contained"
                            sx={{ backgroundColor: "#282C34", m: 1 }}
                          >
                            Update
                          </Button>
                        )}
                      </Stack>
                    </Stack>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">PAYMENT</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        <Stack></Stack>
        <Stack sx={{ mt: 2, pl: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ width: 200 }}>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography>ORDER SUMMARY</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Total &nbsp;&nbsp; $
                    {cart?.reduce((accumulator, object) => {
                      return accumulator + Number(object.price);
                    }, 0)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <Button
                      onClick={handleOrder}
                      size="small"
                      variant="contained"
                      sx={{ backgroundColor: "#282C34" }}
                    >
                      PLACE ORDER
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
      <Stack>
        <TableContainer>
          <Table sx={{ maxWidth: 600 }}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">ORDER ITEMS</Typography>
                </TableCell>
              </TableRow>
              {cart.map((product) => (
                <TableRow key={product.key}>
                  <TableCell>
                    <img
                      width="50"
                      src={product.productImages[0]?.urlString}
                      alt="product"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};

export default OrderPage;
