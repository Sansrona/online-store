import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../api/types";
import { useStore } from "../providers/StoreProvider";

type ProductComponentTypes = {
  product: ProductType;
};

const Product: React.FC<ProductComponentTypes> = observer(({ product }) => {
  const { cartStore } = useStore();
  const { addProductToCart, removeProductFromCart } = cartStore;

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  let ids = JSON.parse(localStorage.getItem("ids") || "null");

  const onAdd = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addProductToCart(product);
    setIsAddedToCart(true)
  };

  const onDrop = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeProductFromCart(product.id);
    setIsAddedToCart(false)

  };

  useEffect(() => {
    setIsAddedToCart(ids?.includes(product.id));
    
  }, []);

  return (
    <div>
      <div key={product.id}>
        {product.title}price{product.price}
        {!isAddedToCart ? (
          <button onClick={onAdd}>Add to Cart </button>
        ) : (
          <button onClick={onDrop}>Drop from Cart </button>
        )}
        <button>
            <Link to={`product-details/${product.id}`}>Details</Link>
        </button>
      </div>
    </div>
  );
});

export default Product;
