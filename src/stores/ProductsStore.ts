import { makeAutoObservable, action } from "mobx";

import Api from "../api";
import { Product } from "../api/types";

type storeProducts = Product[] | [];

class Products {
  products: storeProducts = [];
  constructor() {
    makeAutoObservable(this);
  }

  get categories() {
    return Array.from(
      new Set(this.products.map((product) => product.category))
    );
  }

  get brands() {
    return Array.from(
      new Set(this.products.map((product) => product.brand))
    );
  }

  getAllProducts() {
    Api.getAllProducts()
      .then(
        action(({ products: data }) => {
          this.products = data;
        })
      )
      .catch(action((err) => console.log(err)));
  }
}

export default new Products();
