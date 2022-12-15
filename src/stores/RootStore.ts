import ProductsStore from "./ProductsStore";

class RootStore {
  productsStore;
  constructor() {
    this.productsStore = ProductsStore;
  }
}
export default new RootStore();
