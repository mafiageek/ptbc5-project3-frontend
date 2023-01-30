import React from "react";
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
} from "@mui/material";
import products from "../products";
import Ratings from "../components/Ratings";
import { useNavigate, useParams } from "react-router-dom";

const ProductPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p._id === params.id);

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
                sx={{ objectFit: "contain", width: 512, height: 512 }}
                image={product.image}
              />
            </Grid>
            <Grid item sm={4}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {product.name}
              </Typography>
              <Divider sx={{ m: 2 }} />
              <Ratings
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <Divider sx={{ m: 2 }} />
              <Typography>{product.price}</Typography>
              <Typography variant="body2" paragraph sx={{ noWrap: false }}>
                {product.description}
              </Typography>
            </Grid>
            <Grid item sm={2}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Price: {product.price}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Status:{" "}
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          sx={{ background: "black" }}
                          disabled={product.countInStock === 0}
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
