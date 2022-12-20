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
              if (curValues && curValues.includes(curItem)) {
                counter++;
              }
            }
            if (crit["field"] === "stock" || crit["field"] === "price") {
              let curItem = item[crit["field"] as "stock" | "price"];
              if (
                crit["values"] &&
                curItem >= crit["values"][0] &&
                curItem <= crit["values"][1]
              ) {
                counter += 1;
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
      new Set(this.products.map((product) => product.category))
    );
  }

  get brands() {
    return Array.from(new Set(this.products.map((product) => product.brand)));
  }

  get stockValues() {
    return [
      Math.min(...this.products.map((product) => product.stock)),
      Math.max(...this.products.map((product) => product.stock)),
    ];
  }

  get currentStockValues() {
    console.log(this.allProducts);
    
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

// if (this.filters) {
//   let filtered: Product[] = this.products;
//   let filteredArr: Product[] = [];
//   for (let key in this.filters) {
//     let newArr: Product[] = [];
//     for (let option of this.filters[key as keyof Filters]!) {
//       newArr = [
//         ...newArr,
//         ...filtered.filter(
//           (product) => product[key as keyof Product] === option
//         ),
//       ];
//       console.log(newArr, '2');

//     }
//     filteredArr = [...filteredArr, ...newArr];

//     filtered = Array.from(filteredArr);
//   }
//   console.log(filtered, "filtered2");

//   let resArr: Product[]= [];
//   filtered.forEach((product, _, self) => {
//     if(self.indexOf(product) === self.lastIndexOf(product)){
//       resArr.push(product);
//     }
//   })
//   console.log(resArr, "resArr");

//   return resArr;
// }
