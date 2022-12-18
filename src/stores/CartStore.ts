import { makeAutoObservable } from "mobx";
import { Product } from "../api/types";

type ProductInCartType = {
  product: Product;
  count: number;
};

// type CartType = ProductInCartType[] | [];

class CartStore {
  cart: ProductInCartType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get productsCountInCart() {
    return this.cart.length;
  }

  addProductToCart(product: Product) {
    let newItem: ProductInCartType = {
      product,
      count: 0,
    };
    this.cart.push(newItem);
  }

  removeProductFromCart(productId: number) {
    this.cart = this.cart.filter((p) => p.product.id !== productId);
  }

  incrementProductCount(productId: number) {
    let product = this.cart.find((p) => p.product.id === productId);
    if (product) {
      product.count += 1;
    }
  }

  decrementProductCount(productId: number) {
    let product = this.cart.find((p) => p.product.id === productId);
    if (product && product.count > 0) {
      product.count -= 1;
    }
  }
}
