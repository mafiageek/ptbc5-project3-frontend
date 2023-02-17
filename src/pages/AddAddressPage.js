import React, { useState } from "react";
import axios from "axios";
import { Container, Stack, TextField, Typography, Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useLocation } from "react-router-dom";

const AddAddressPage = () => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    country: "",
    postal: "",
  });
  const { user } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`http://localhost:3001/users?email=${user?.email}`)
      .then(({ data }) => {
        axios
          .post(`http://localhost:3001/addresses`, {
            userId: data[0].id,
            addressLine1: formData.address,
            city: formData.city,
            country: formData.country,
            postal: formData.postal,
          })
          .then(navigate(location.state) || "/");
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h6">ADD ADDRESS</Typography>
      <Stack direction="column" spacing={2} sx={{ mt: 1 }}>
        <TextField
          value={formData?.address}
          onChange={handleChange}
          fullWidth
          id="address"
          name="address"
          label="Address"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          value={formData?.city}
          onChange={handleChange}
          fullWidth
          id="city"
          name="city"
          label="city"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          value={formData?.postal}
          onChange={handleChange}
          fullWidth
          id="postal"
          name="postal"
          label="Postal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          value={formData?.country}
          onChange={handleChange}
          fullWidth
          id="country"
          name="country"
          label="Country"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ background: "black" }}
        >
          Submit
        </Button>
      </Stack>
    </Container>
  );
};

export default AddAddressPage;
