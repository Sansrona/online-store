import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../providers/StoreProvider";
import { IoCartOutline } from "react-icons/io5";

const Header = observer(() => {
  const { cartStore } = useStore();
  const {
    productsCountInCart,
    productsPriceInCart,
    setIdsFromStorage,
    setCartFromStorage,
    priceWithDiscount,
  } = cartStore;

  React.useEffect(() => {
    setCartFromStorage();
    setIdsFromStorage();
  }, []);

  return (
    <header className="flex items-center justify-between pt-4 pb-8">
      <Link to="/">
        <h1 className="font-bold text-xl">Online Shop</h1>
      </Link>
      <div className="flex gap-6">
        <p className="font-medium">Items in cart: {productsCountInCart}</p>
        <p className="font-medium">
          Cart total:{" "}
          {priceWithDiscount ? priceWithDiscount : productsPriceInCart}
        </p>
      </div>
      <Link className="flex gap-2 items-center" to="/cart">
        <span className="font-medium leading-5">Cart</span>
        <IoCartOutline size="32px" />
      </Link>
    </header>
  );
});

export default Header;
