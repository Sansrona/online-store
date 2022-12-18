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
        criterias: { field: string; values: string[] | undefined }[]
      ) => {
        let matches = [];
        const matchFilters = (item: Product) => {
          let counter = 0;
          for (let crit of criterias) {           
            if (
              crit["values"] &&
              crit["values"].includes(
                item[crit["field"] as "brand" | "category"].toLowerCase()
              )
            ) {
              counter++;
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
        if (this.filters[key as "brand" | "category"]?.length) {
          newFilters.push({
            field: key,
            values: this.filters[key as "brand" | "category"],
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
