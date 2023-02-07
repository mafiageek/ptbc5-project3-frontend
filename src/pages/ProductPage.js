import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Card,
  CardMedia,
  CardContent,
  Table,
  Typography,
  Divider,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Grid,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// import Ratings from "../components/Ratings";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState([]);
  const [qty, setQty] = useState(1);

  useEffect(
    () => {
      axios
        .get(`http://localhost:3001/products/${params.id}`)
        .then(({ data }) => {
          setProduct(data);

          setImage(data.productImages[0].url_string);

          setCategory(data.category["category_name"]);
        });
    },
    [params.id],
    [category]
  );

  const handleCart = () => {
    // need a post to order controller
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Button
        sx={{ color: "black" }}
        variant="text"
        onClick={() => {
          navigate(-1);
        }}
      >
        GO BACK
      </Button>

      <Card key={product._id}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <CardMedia
                sx={{ objectFit: "contain", width: 434, height: 512 }}
                image={image.toString()}
                src="product image"
              />
            </Grid>
            <Grid item sm={4}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {product.name}
              </Typography>
              <Divider sx={{ m: 2 }} />
              {/* <Ratings
                value={product.rating}
                text={`${product.numReviews} reviews`}
              /> */}
              <Divider sx={{ m: 2 }} />
              <Typography variant="body2" sx={{ mb: 2 }}>
                Manufacturer: {product.brand}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Category: {category.toString()}
              </Typography>
              <Typography variant="body2" paragraph sx={{ noWrap: false }}>
                Decription: {product.description}
              </Typography>
            </Grid>
            <Grid item sm={2}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Price: ${product.price}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Status:{" "}
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <FormControl>
                          <InputLabel>Qty</InputLabel>
                          <Select
                            autoWidth
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.stock).keys()].map((x) => (
                              <MenuItem value={x + 1}>{x + 1}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">
                        <Button
                          onClick={handleCart}
                          variant="contained"
                          sx={{ background: "black" }}
                          disabled={product.stock === 0}
                        >
                          ADD TO CART
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductPage;
