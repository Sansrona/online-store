import { makeAutoObservable, action } from "mobx";

import Api from "../api";
import { Filters, Product } from "../api/types";

type storeProducts = Product[] | [];

class Products {
  products: storeProducts = [];
  filters: Filters | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  get allProducts() {
    if (this.filters) {
      let filtered = this.products;
      for (let key in this.filters) {
        for (let option of this.filters[key as keyof Filters]!) {
          filtered = filtered.filter(
            (product) => product[key as keyof Product] === option
          );
        }
      }
      console.log(filtered);

      return filtered;
    }
    return this.products;
  }

  get categories() {
    return Array.from(
      new Set(this.products.map((product) => product.category))
    );
  }

  get brands() {
    return Array.from(new Set(this.products.map((product) => product.brand)));
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

  filterProducts = (filterOptions: Filters) => {
    this.filters = filterOptions;
  };
}

export default new Products();
