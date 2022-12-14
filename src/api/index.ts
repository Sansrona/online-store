import { Product, Products } from "./types";

const baseURL = "https://dummyjson.com/products?limit=100";

class Api {
  async getAllProducts(): Promise<Products> {
    const resp = await fetch(baseURL);
    return await resp.json();
  }

  async getFilteredProducts(query: string): Promise<Products> {
    const resp = await fetch(baseURL + `/?${query}`);
    return await resp.json();
  }
}

export default new Api();
