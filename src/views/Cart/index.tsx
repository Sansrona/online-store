import {observer} from "mobx-react-lite";
import React from "react";
import Promocodes from "../../components/Promocodes";
import {useStore} from "../../providers/StoreProvider";

const Cart = observer(() => {
  const {cartStore} = useStore();
  const {
    cart,
    incrementProductCount,
    decrementProductCount,
    productsCountInCart,
    productsPriceInCart,
    priceWithDiscount,
    setPromo,
    dropPromo,
    discountList
  } = cartStore;

  const onIncrement = (productId: number) => {
    incrementProductCount(productId);
  };

  const onDecrement = (productId: number) => {
    decrementProductCount(productId);
  };

  React.useEffect(() => {
    // console.log(priceWithDiscount);
  });

  return (
    <div className="flex-1 flex justify-center items-start pt-24 gap-8">
      <div className="flex flex-col border flex-1">
        <p className="border font-medium px-4 py-1">Products In Cart</p>
        <div className="flex flex-col divide-y">{cart.map(({product, count}) => {
          return (
            <div className="flex justify-between" key={product.id}>
              <img className="border-r aspect-video max-w-[200px] object-cover"
                   src={product.images[0]}
                   alt=""/>
              <div className="flex flex-col items-center justify-center flex-1 px-4">
                <p className="font-medium">{product.title}</p>
                <p className="pt-1 text-center">{product.description}</p>
                <div className="flex items-center gap-8 pt-2">
                  <p>Rating: {product.rating}</p>
                  <p>Discount: {product.discountPercentage}</p>
                </div>
              </div>

              <div
                className="max-w-[200px] w-full border-l flex flex-col items-center justify-center gap-3">
                <p>Stock: {product.stock}</p>
                <div className="flex justify-center gap-2 items-center">
                  <button className="flex justify-center items-center rounded-full bg-green-300 w-7 h-7"
                          onClick={() => onIncrement(product.id)}>+
                  </button>
                  <p>{count}</p>
                  <button className="flex justify-center items-center rounded-full bg-red-300 w-7 h-7"
                          onClick={() => onDecrement(product.id)}>-
                  </button>
                </div>
                <p>${count * product.price}</p>
              </div>
            </div>
          );
        })}</div>
      </div>

      <div className="border w-1/3 flex flex-col items-center">
        <p className="text-center px-4 py-1 border self-stretch">Summary</p>
        <p className="font-medium pt-4 text-xl">Products: {productsCountInCart}</p>
        <p className="font-medium pt-4 text-xl pb-4">Total: ${productsPriceInCart}</p>
        {priceWithDiscount > 0 && <div>Price: {priceWithDiscount}</div>}
        <Promocodes setDiscount={setPromo} dropDiscount={dropPromo} discountList={discountList}/>
        <button
          className="py-2 px-8 mb-4 border bg-amber-400 hover:bg-amber-500 transition-colors uppercase font-medium rounded-xl">Buy
          Now
        </button>
      </div>
    </div>
  );
});

export default Cart;
