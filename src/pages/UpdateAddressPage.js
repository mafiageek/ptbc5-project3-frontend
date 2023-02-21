import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Stack, TextField, Typography, Button } from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const UpdateAddressPage = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    addressLine1: "",
    city: "",
    country: "",
    postal: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(
        `http://localhost:3001/addresses/${params.id}`,
        {
          addressLine1: formData.addressLine1,
          city: formData.city,
          country: formData.country,
          postal: formData.postal,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(navigate(location.state) || "/", {
        state: `/updateaddress/${params.id}`,
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/addresses/${params.id}`)
      .then(({ data }) => {
        console.log(data);
        setFormData({
          addressLine1: data.addressLine1,
          city: data.city,
          country: data.country,
          postal: data.postal,
        });
      });

    if (isAuthenticated && user?.email) {
      const getToken = async () => {
        await getAccessTokenSilently().then((jwt) => {
          setToken(jwt);
        });
      };
      getToken();
    }
  }, [params.id, getAccessTokenSilently, isAuthenticated, user?.email]);

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h6">UPDATE ADDRESS</Typography>
      <Stack direction="column" spacing={2} sx={{ mt: 1 }}>
        <TextField
          value={formData?.addressLine1}
          onChange={handleChange}
          fullWidth
          id="address"
          name="addressLine1"
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

export default UpdateAddressPage;
