import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
} from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const ProfilePage = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useAuth0();

  useEffect(() => {
    const getOrderItems = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/users?email=${user.email}`
      );

      setOrders(data[0].orders);
    };

    getOrderItems();
  }, [user?.email]);

  return (
    <Container sx={{ mt: 10 }} maxWidth="md">
      <Typography variant="h6">MY ORDERS</Typography>
      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>TOTAL</TableCell>
              <TableCell>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
                {/* <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ backgroundColor: "#282C34", m: 1 }}
                  >
                    DETAIL
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ProfilePage;
