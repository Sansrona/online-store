import React from "react";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

import "./App.scss";
import { Header, Footer } from "./views/";

import { useStore } from "./providers/StoreProvider";

const App: React.FC = observer(() => {
  const { productsStore } = useStore();
  const { getAllProducts } = productsStore;

  React.useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
});

export default App;
