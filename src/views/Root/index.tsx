import React from "react";
import {observer} from "mobx-react-lite";

import {useStore} from "../../providers/StoreProvider";
import Sidebar from "../../components/Sidebar";
import Products from "../../components/Products";


const Root: React.FC = observer(() => {
  const {productsStore} = useStore();
  const {
    allProducts: products,
    setSort,
    setSearch,
  } = productsStore;


  return (
    <div className="flex gap-4 justify-between flex-shrink-0">
      <Sidebar/>
      <Products products={products} sort={setSort} setSearch={setSearch}/>
    </div>
  );
});

export default Root;
