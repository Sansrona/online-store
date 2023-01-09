import React from "react";
import {observer} from "mobx-react-lite";
import {Outlet} from "react-router-dom";

import {Header, Footer} from "./views/";

import {useStore} from "./providers/StoreProvider";

const App: React.FC = observer(() => {
  const {productsStore} = useStore();
  const {getAllProducts} = productsStore;

  React.useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto min-h-screen flex flex-col">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
});

export default App;
