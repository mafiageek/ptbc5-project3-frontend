import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CartProvider } from "./context/cart";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-v142ohfthr7u4kgs.au.auth0.com"
      clientId="dfKk6fxxpMh6FdlYzQOD8eKTmjEdrdqJ"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "http://localhost:3001",
      }}
    >
      <CartProvider>
        <App />
      </CartProvider>
    </Auth0Provider>
  </React.StrictMode>
);
