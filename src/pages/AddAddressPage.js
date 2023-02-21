import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Stack, TextField, Typography, Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useLocation } from "react-router-dom";

const AddAddressPage = () => {
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    country: "",
    postal: "",
  });
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState({
    id: "",
    role: "",
  });

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
      .post(
        `http://localhost:3001/addresses`,

        {
          userId: currentUser.id,
          addressLine1: formData.address,
          city: formData.city,
          country: formData.country,
          postal: formData.postal,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(navigate(location.state) || "/");
  };

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      axios
        .get(`http://localhost:3001/users?email=${user?.email}`)
        .then(({ data }) => {
          console.log("data =>", data);
          setCurrentUser({
            id: data[0].id,
            role: data[0].role,
          });
        });
    }

    const getToken = async () => {
      await getAccessTokenSilently().then((jwt) => {
        setToken(jwt);
      });
    };
    getToken();
    // console.log(token);
  }, [getAccessTokenSilently, user?.email, token, isAuthenticated]);

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
        {user?.email && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ background: "black" }}
          >
            Submit
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default AddAddressPage;
