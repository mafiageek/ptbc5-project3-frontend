import React from "react";
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
  TableHead,
} from "@mui/material";

const ProfilePage = () => {
  return (
    <Container sx={{ mt: 10 }} maxWidth="md">
      <Stack direction="row">
        <Stack direction="column" spacing={1}>
          <Typography variant="h6">PROFILE</Typography>
          <TextField variant="outlined" label="Name" name="name" size="small" />
          <TextField
            variant="outlined"
            label="Email"
            name="email"
            size="small"
          />
          <TextField
            variant="outlined"
            label="Address"
            name="address"
            size="small"
          />
          <TextField variant="outlined" label="City" name="city" size="small" />
          <TextField
            variant="outlined"
            label="Country"
            name="country"
            size="small"
          />
          <TextField
            variant="outlined"
            label="Postal Code"
            name="postalCode"
            size="small"
          />
          <Button
            size="small"
            variant="contained"
            sx={{ backgroundColor: "#282C34", m: 1 }}
          >
            UPDATE
          </Button>
        </Stack>

        <Stack sx={{ pl: 4 }}>
          <Typography variant="h6">MY ORDERS</Typography>
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>DATE</TableCell>
                  <TableCell>TOTAL</TableCell>
                  <TableCell>PAID</TableCell>
                  <TableCell>DELIVERED</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>ACTION</TableCell>
                  <TableCell>ACTION</TableCell>
                  <TableCell>ACTION</TableCell>
                  <TableCell>ACTION</TableCell>
                  <TableCell>ACTION</TableCell>
                  <TableCell>
                    {" "}
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ backgroundColor: "#282C34", m: 1 }}
                    >
                      DETAIL
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

export default ProfilePage;
