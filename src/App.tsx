import React from "react";
import { observer } from "mobx-react-lite";

import "./App.scss";
import { useStore } from "./providers/StoreProvider";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";

const App: React.FC = observer(() => {
  const { productsStore } = useStore();
  const { allProducts: products, setSort } = productsStore;

  React.useEffect(() => {
    productsStore.getAllProducts();
  }, []);

  return (
    <div className="container">
      <Sidebar />
      <Products products={products} sort={setSort} />
    </div>
  );
});

export default App;
