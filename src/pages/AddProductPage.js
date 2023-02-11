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

const AddProductPage = () => {
  const [allCategory, setAllCategory] = useState([]);
  const [formData, setFormData] = useState({});
  const [value, setValue] = useState("");

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
  }, [value]);

  // const handleCategory = () => {
  //   axios.post("http://localhost:3001/categories/createcategory", {
  //     category_name: category,
  //   });
  // };

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
    setFormData({
      ...formData,
      categoryId: temp,
    });

    const data = JSON.stringify(formData);
    console.log(data);

    axios
      .post("http://localhost:3001/products", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h6">ADD PRODUCT</Typography>
      <Stack direction="column" spacing={2} sx={{ mt: 1 }}>
        <TextField
          value={formData.name}
          onChange={handleChange}
          fullWidth
          id="name"
          name="name"
          label="Name"
          variant="outlined"
        />
        <TextField
          value={formData.brand}
          onChange={handleChange}
          fullWidth
          id="brand"
          name="brand"
          label="Brand"
          variant="outlined"
        />
        <TextField
          value={formData.stock}
          onChange={handleChange}
          fullWidth
          id="stock"
          name="stock"
          label="Stock"
          variant="outlined"
        />
        <TextField
          value={formData.price}
          onChange={handleChange}
          fullWidth
          id="price"
          name="price"
          label="Price"
          variant="outlined"
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
        />
        <TextField
          value={formData.urlString}
          onChange={handleChange}
          fullWidth
          id="urlString"
          name="urlString"
          label="Image url"
          variant="outlined"
        />
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
          ADD
        </Button>
      </Stack>
    </Container>
  );
};

export default AddProductPage;
