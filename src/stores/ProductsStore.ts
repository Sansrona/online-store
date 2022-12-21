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
      const filterNew = (
        criterias: { field: string; values: string[] | number[] | undefined }[]
      ) => {
        let matches = [];
        const matchFilters = (item: Product) => {
          let counter = 0;
          for (let crit of criterias) {
            if (crit["field"] === "category" || crit["field"] === "brand") {
              let curItem: string = item[crit["field"] as "brand" | "category"];

              let curValues: string[] = crit["values"] as string[];
              if (curValues && curValues.includes(curItem.toLowerCase())) {
                counter++;
              }
            }
            if (crit["field"] === "stock" || crit["field"] === "price") {
              let curItem = item[crit["field"] as "stock" | "price"];

              if (
                crit["values"] &&
                crit["values"].length &&
                curItem >= crit["values"][0] &&
                curItem <= crit["values"][1]
              ) {
                counter++;
              }
            }
          }

          return counter === criterias.length;
        };

        for (let item of this.products) {
          if (matchFilters(item)) {
            matches.push(item);
          }
        }
        return matches;
      };
      let newFilters = [];
      for (let key in this.filters) {
        if (this.filters[key as keyof Filters]?.length) {
          newFilters.push({
            field: key,
            values: this.filters[key as keyof Filters],
          });
        }
      }
      const resArr = filterNew(newFilters);
      
      return resArr;
    }
    return this.products;
  }

  get categories() {
    return Array.from(
      new Set(this.products.map((product) => product.category.toLowerCase()))
    );
  }

  get brands() {
    return Array.from(
      new Set(this.products.map((product) => product.brand.toLowerCase()))
    );
  }

  get stockValues() {
    return [
      Math.min(...this.products.map((product) => product.stock)),
      Math.max(...this.products.map((product) => product.stock)),
    ];
  }

  get currentStockValues() {   
      return [
        Math.min(...this.allProducts.map((product) => product.stock)),
        Math.max(...this.allProducts.map((product) => product.stock)),
      ];
      
  }

  get priceValues() {
    return [
      Math.min(...this.products.map((product) => product.price)),
      Math.max(...this.products.map((product) => product.price)),
    ];
  }

  get currentPriceValues() {
      return [
        Math.min(...this.allProducts.map((product) => product.price)),
        Math.max(...this.allProducts.map((product) => product.price)),
      ];
    
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
