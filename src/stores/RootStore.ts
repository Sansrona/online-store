import ProductsStore from "./ProductsStore";
import CartStore from "./CartStore";

class RootStore {
  productsStore;
  cartStore;
  constructor() {
    this.cartStore = CartStore;
    this.productsStore = ProductsStore;
  }
}
export default new RootStore();
