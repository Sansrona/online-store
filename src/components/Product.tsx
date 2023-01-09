import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {ProductType} from "../api/types";
import {useStore} from "../providers/StoreProvider";
import {AiFillStar} from "react-icons/ai";

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
    <div className="rounded-md shadow-md border border-slate-300 flex flex-col max-w-[240px] w-full aspect-square"
         key={product.id}>
      <img className="rounded-t-md w-full object-fill aspect-square" loading="lazy" src={product.images[0]} alt=""/>
      <div className="flex-1 p-4 flex flex-col justify-between ">
        <p
          className="font-medium overflow-ellipsis">{product.title.length > 22 ? `${product.title.substring(0, 22)}...` : product.title}
        </p>
        <div className="flex items-center pt-1.5 gap-2">
          <div
            className="flex">{Array(Math.round(product.rating)).fill(null).map(() =>
            <AiFillStar className="fill-yellow-500" fill=""/>)}</div>
        </div>
        <p className="pt-1.5 text-xl font-medium">
          ${product.price}
        </p>
        <div className="flex gap-4 pt-1.5">{!isAddedToCart ? (
          <button
            className="px-2 py-1.5 rounded bg-green-200 hover:bg-green-300 transition-colors text-sm uppercase font-medium"
            onClick={onAdd}>Add to
            Cart </button>
        ) : (
          <button
            className="px-2 py-1.5 rounded bg-red-300 hover:bg-red-400 transition-colors text-sm uppercase font-medium"
            onClick={onDrop}>Drop</button>
        )}
          <button
            className="px-2 py-1.5 rounded bg-slate-200 hover:bg-slate-300 transition-colors text-sm uppercase font-medium">
            <Link to={`product-details/${product.id}`}>Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
});

export default Product;
