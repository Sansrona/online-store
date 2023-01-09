import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useStore} from "../../providers/StoreProvider";

const ProductDetails = observer(() => {
  const {productId} = useParams();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  let idsString = localStorage.getItem("ids") || "null";
  let ids = JSON.parse(idsString);
  const {productsStore, cartStore} = useStore();
  const {getProduct, product} = productsStore;
  const {addProductToCart, removeProductFromCart} = cartStore;

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

  const [selectedImage, setSelectedImage] = useState<undefined | string>(product?.images[0])

  useEffect(() => {
    setSelectedImage(product?.images[0])
  }, [product])

  return (
    <div className="flex-1 flex flex-col justify-center">
      {product ? (
        <div className="flex flex-col items-center">
          <div className="flex self-center justify-between w-1/2 pb-8">
            <Link to="/">Store &gt;</Link>
            <p className="capitalize">{product?.category} &gt;</p>
            <p className="capitalize">{product?.brand} &gt;</p>
            <p className="capitalize">{product?.title}</p>
          </div>
          <div className="self-center justify-self-center max-w-screen-lg shadow-custom rounded-2xl w-full flex ">
            <div className="max-w-full flex flex-col flex-1">
              <img className="object-fill rounded-tl-2xl aspect-video" src={selectedImage} alt=""/>
              <div className="pt-4 flex gap-4 justify-center">
                {product.images.map((image) => <img key={image} onClick={() => setSelectedImage(image)}
                                                    className="aspect-video object-fill max-w-[100px] cursor-pointer"
                                                    src={image}
                                                    alt=""/>)}
              </div>
            </div>
            <div className="flex-1 py-4 px-4 self-center">
              <p className="text-xl font-medium">{product?.title}</p>
              <p className="pt-1 text-lg">{product.description}</p>
              <p className="pt-1.5 text-lg font-medium">${product.price} (-{product.discountPercentage}%)</p>
              <div className="pt-3 buttons flex gap-4">
                {!isAddedToCart ? (
                  <button
                    className="px-2 py-1.5 rounded bg-green-300 hover:bg-green-400 transition-colors text-sm uppercase font-medium"
                    onClick={onAddProduct}>Add to Cart</button>
                ) : (
                  <button
                    className="px-2 py-1.5 rounded bg-red-300 hover:bg-red-400 transition-colors text-sm uppercase font-medium"
                    onClick={onRemoveProduct}>Remove from Cart</button>
                )}
                <button
                  className="px-2 py-1.5 rounded bg-amber-400 hover:bg-amber-500 transition-colors text-sm uppercase font-medium">Buy
                  Now
                </button>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      ) : (
        <p>No such product</p>
      )}
    </div>
  );
});

export default ProductDetails;
