import { observer } from "mobx-react-lite";
import React from "react";
import Promocodes from "../../components/Promocodes";
import { useStore } from "../../providers/StoreProvider";

const Cart = observer(() => {
  const { cartStore } = useStore();
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
    <div>
      <div>
        {cart.map(({ product, count }) => {
          return (
            <div key={product.id}>
              <p>Product name {product.title}</p>
              <p>Count: {count}</p>
              <p>Sum {count * product.price}</p>
              <p>In stock {product.stock}</p>
              <div>
                <button onClick={() => onIncrement(product.id)}>+</button>
                <button onClick={() => onDecrement(product.id)}>-</button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div>Count: {productsCountInCart}</div>
      <div>Price: {productsPriceInCart}</div>
      {priceWithDiscount > 0 && <div>Price: {priceWithDiscount}</div>}
      <Promocodes setDiscount={setPromo} dropDiscount={dropPromo} discountList={discountList}/>
    </div>
  );
});

export default Cart;
