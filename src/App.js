import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductsPage, ProductPage } from "./pages/";
import { Header } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
