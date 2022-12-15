import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import App from "./App";
import { Cart, ErrorPage, Header, Footer, ProductDetails } from "./views/";
import "./styles/normalize.css";
import "./index.scss";
import StoreProvider from "./providers/StoreProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreProvider>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="product-details/:productId" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </StoreProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
