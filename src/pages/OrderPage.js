import React, { useEffect, useState } from "react";
import { useCart } from "../context/cart";
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
  TextField,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const OrderPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [addresses, setAddresses] = useState([]);
  const [cart] = useCart();

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`http://localhost:3001/users?email=${user?.email}`)
        .then(({ data }) => {
          return axios.get(`http://localhost:3001/users/${data[0].id}`);
        })
        .then(({ data }) => {
          console.log("addresses", data.userAddresses);
          setAddresses(data.userAddresses);
        });
    }
  }, [isAuthenticated, user.email]);

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Stack direction="row">
        <Stack direction="column">
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">SHIPPING</Typography>
                    <Stack direction="column" spacing={1}>
                      {addresses?.map((a) => (
                        <TextField value={a.addressLine1} />
                      ))}
                    </Stack>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">PAYMENT</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">ORDER ITEMS</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
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
    </Container>
  );
};

export default OrderPage;
