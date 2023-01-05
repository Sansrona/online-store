import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {ProductType} from "../api/types";
import {useStore} from "../providers/StoreProvider";

type ProductComponentTypes = {
  product: ProductType;
};

const Product: React.FC<ProductComponentTypes> = observer(({product}) => {
  const {cartStore} = useStore();
  const {addProductToCart, removeProductFromCart} = cartStore;

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  let ids = JSON.parse(localStorage.getItem("ids") || "null");

  const onAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addProductToCart(product);
    setIsAddedToCart(true)
  };

  const onDrop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeProductFromCart(product.id);
    setIsAddedToCart(false)

  };

  useEffect(() => {
    setIsAddedToCart(ids?.includes(product.id));
  }, []);

  return (
    <div className="border border-slate-300 flex flex-col max-w-xs w-60 aspect-square" key={product.id}>
      <img className="object-contain aspect-square" src={product.images[0]} alt=""/>
      <p>{product.title}</p>
      <div>
        price{product.price}
      </div>
      {!isAddedToCart ? (
        <button onClick={onAdd}>Add to Cart </button>
      ) : (
        <button onClick={onDrop}>Drop from Cart </button>
      )}
      <button>
        <Link to={`product-details/${product.id}`}>Details</Link>
      </button>
    </div>
  );
});

export default Product;
