import { makeAutoObservable, action } from "mobx";

import Api from "../api";
import { Filters, Product, SortTypes } from "../api/types";

type storeProducts = Product[] | [];

class Products {
  products: storeProducts = [];
  filters: Filters | null = null;
  sortOption: SortTypes = "default" as SortTypes;
  searchParam: string = "";
  constructor() {
    makeAutoObservable(this);
  }

  get allProducts() {
    let productsArr = [...this.products];
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
      let resArr = filterNew(newFilters);
      resArr = this.searchProducts(this.searchParam, resArr);
      return this.sortProducts(resArr);
    }
    productsArr = this.searchProducts(this.searchParam, productsArr)
    return this.sortProducts(productsArr);
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

  setSort = (sortOption: SortTypes): void => {
    this.sortOption = sortOption;
  };

  sortProducts = (products: Product[]): Product[] => {
    switch (this.sortOption) {
      case SortTypes.priceASC: {
        return products.sort((a, b) => a.price - b.price);
      }
      case SortTypes.priceDESC: {
        return products.sort((a, b) => b.price - a.price);
      }
      case SortTypes.ratingASC: {
        return products.sort((a, b) => a.rating - b.rating);
      }
      case SortTypes.ratingDESC: {
        return products.sort((a, b) => b.rating - a.rating);
      }
      case SortTypes.discountASC: {
        return products.sort(
          (a, b) => a.discountPercentage - b.discountPercentage
        );
      }
      case SortTypes.discountDESC: {
        return products.sort(
          (a, b) => b.discountPercentage - a.discountPercentage
        );
      }
      default:
        return products;
    }
  };

  setSearch = (search: string) => {
    this.searchParam = search;
  };

  searchProducts = (param: string, products: Product[]): Product[] => {
    products = products.filter((product) => {
      let isFound = false;
      for (let key in product) {
        isFound = product[key as keyof Product].toString().toLowerCase().includes(param)
          ? true
          : false;
        if (isFound) {
          return true;
        }
      }
      return false;
    });
    return products;
  };
}

export default new Products();
