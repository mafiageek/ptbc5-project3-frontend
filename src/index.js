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
      domain="dev-zldrlxetiu43era6.us.auth0.com"
      clientId="5Xv0y6Epm2Md9C8q1Zbs0SNlQ3Ef3VqM"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <CartProvider>
        <App />
      </CartProvider>
    </Auth0Provider>
  </React.StrictMode>
);
