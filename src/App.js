import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProductPage from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddProductPage from "./pages/AddProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import AddAddressPage from "./pages/AddAddressPage";
import UpdateAddressPage from "./pages/UpdateAddressPage";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
// import AdminRoute from "./routes/AdminRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
        {/* <Route path="/admin" element={<AdminRoute />}> */}
        <Route path="/admin" element={<AdminPage />} />
        {/* </Route> */}
        <Route path="/addproduct" element={<AddProductPage />} />
        <Route path="/addaddress" element={<AddAddressPage />} />
        <Route path="/updateproduct/:id" element={<UpdateProductPage />} />
        <Route path="/updateaddress/:id" element={<UpdateAddressPage />} />
        <Route path="/dashboard" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
