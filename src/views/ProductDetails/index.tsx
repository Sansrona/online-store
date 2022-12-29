import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../providers/StoreProvider";

const ProductDetails = observer(() => {
  const { productId } = useParams();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  let idsString = localStorage.getItem("ids") || "null";
  let ids = JSON.parse(idsString);
  const { productsStore, cartStore } = useStore();
  const { getProduct, product } = productsStore;
  const { addProductToCart, removeProductFromCart } = cartStore;

  useEffect(() => {
    if (productId) {
      getProduct(productId);
      setIsAddedToCart(ids?.includes(+productId));
    }
    console.log(product);
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
      {product ? (
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
      ) : (
        <p>No such product</p>
      )}
    </div>
  );
});

export default ProductDetails;
