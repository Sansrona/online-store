import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import "./styles/normalize.css";
import "./index.scss";
import StoreProvider from "./providers/StoreProvider";
import { Cart, ErrorPage, ProductDetails, Root } from "./views";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Root /> },
      { path: "cart", element: <Cart /> },
      { path: "product-details/:productId", element: <ProductDetails /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StoreProvider>
    <RouterProvider router={router} />
  </StoreProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
