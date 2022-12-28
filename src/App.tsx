import React from "react";
import { observer } from "mobx-react-lite";

import "./App.scss";
import { useStore } from "./providers/StoreProvider";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";

const App: React.FC = observer(() => {
  const { productsStore } = useStore();
  const { allProducts: products, setSort, setSearch, getAllProducts } = productsStore;

  React.useEffect(() => {
    getAllProducts();    
  }, []);

  return (
    <div className="container">
      <Sidebar />
      <Products products={products} sort={setSort} setSearch={setSearch} />
    </div>
  );
});

export default App;
