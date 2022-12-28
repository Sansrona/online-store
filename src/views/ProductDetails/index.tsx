import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../providers/StoreProvider";

const ProductDetails = observer(() => {
  const { productId } = useParams();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  let ids = JSON.parse(localStorage.getItem("ids") || "");
  const { productsStore, cartStore } = useStore();
  const { getProduct, product } = productsStore;
  const { addProductToCart, removeProductFromCart, cart, itemsInCartIds } =
    cartStore;

  useEffect(() => {
    if (productId) {
      getProduct(productId);
      setIsAddedToCart(ids?.includes(+productId));
    }
    
  }, []);

  const onAddProduct = () => {
    addProductToCart(product!);
    setIsAddedToCart(true);
  };

  const onRemoveProduct = () => {
    removeProductFromCart(+productId!);
    setIsAddedToCart(false);
  };

  return (
    <div>
      <div className="breadcrumbs">
        <Link to="/">Store</Link>
        <p> &gt; {product?.category}&gt;</p>
        <p>{product?.brand}&gt;</p>
        <p>{product?.title}</p>
      </div>
      <div>{product?.title}</div>
      <div className="add_button">
        {!isAddedToCart ? (
          <button onClick={onAddProduct}>Add to Cart</button>
        ) : (
          <button onClick={onRemoveProduct}>Remove from Cart</button>
        )}
      </div>
    </div>
  );
});

export default ProductDetails;
