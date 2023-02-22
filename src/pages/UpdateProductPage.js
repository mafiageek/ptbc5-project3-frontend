import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";

const UpdateProductPage = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [token, setToken] = useState(null);
  const [allCategory, setAllCategory] = useState([]);
  const [formData, setFormData] = useState({});
  const [value, setValue] = useState("");
  const params = useParams();
  // const [image, setImage] = useState("");
  const navigate = useNavigate();

  const getIdFromCategoryName = (categoryName) => {
    for (const item of allCategory) {
      if (item.categoryName === categoryName) {
        return item.id;
      }
    }
    return null;
  };

  useEffect(() => {
    axios.get("http://localhost:3001/categories").then(({ data }) => {
      setAllCategory(data);
    });

    if (isAuthenticated && user?.email) {
      const getToken = async () => {
        await getAccessTokenSilently().then((jwt) => {
          setToken(jwt);
        });
      };
      getToken();
    }
  }, [isAuthenticated, user?.email, getAccessTokenSilently, value]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const temp = getIdFromCategoryName(value);
    console.log(temp);

    axios
      .patch(
        `http://localhost:3001/products/${params.id}`,
        {
          name: formData.name,
          categoryId: temp,
          brand: formData.brand,
          description: formData.description,
          price: formData.price,
          stock: formData.stock,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        // console.log(response.data);
        toast.success("Updated");
        navigate("/products");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${params.id}`)
      .then(({ data }) => {
        setFormData(data);
        console.log(data);
        setValue(data.category["categoryName"]);
        // setImage(data.productImages[0]?.urlString);
      });
  }, [params.id]);

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h6">UPDATE PRODUCT</Typography>
      <Stack direction="column" spacing={2} sx={{ mt: 1 }}>
        <TextField
          value={formData.name}
          onChange={handleChange}
          fullWidth
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          value={formData.brand}
          onChange={handleChange}
          fullWidth
          id="brand"
          name="brand"
          label="Brand"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          value={formData.stock}
          onChange={handleChange}
          fullWidth
          id="stock"
          name="stock"
          label="Stock"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          value={formData.price}
          onChange={handleChange}
          fullWidth
          id="price"
          name="price"
          label="Price"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          value={formData.description}
          onChange={handleChange}
          fullWidth
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          multiline
          InputLabelProps={{ shrink: true }}
        />
        {/* <TextField
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          id="urlString"
          name="urlString"
          label="Image url"
          variant="outlined"
        /> */}
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select
            id="name"
            label="category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            {allCategory.map((item) => (
              <MenuItem key={item.id} value={item.categoryName}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ background: "black" }}
        >
          UPDATE
        </Button>
      </Stack>
    </Container>
  );
};

export default UpdateProductPage;
