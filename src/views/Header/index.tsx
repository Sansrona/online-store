import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../providers/StoreProvider";

const Header = observer(() => {
  const { cartStore } = useStore();
  const {
    productsCountInCart,
    productsPriceInCart,
    setIdsFromStorage,
    setCartFromStorage,
  } = cartStore;

  React.useEffect(() => {
    setCartFromStorage();
    setIdsFromStorage()
  }, []);

  return (
    <header>
      <div>Header</div>
      <div>{productsCountInCart}</div>
      <div>{productsPriceInCart}</div>
      <Link to="/cart">Cart</Link>
    </header>
  );
});

export default Header;
