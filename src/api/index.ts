import { Product, Products } from "./types";

const baseURL = "https://dummyjson.com/products";

class Api {
  async getAllProducts(): Promise<Products> {
    const resp = await fetch(baseURL + '?limit=100');
    return await resp.json();
  }

  async getFilteredProducts(query: string): Promise<Products> {
    const resp = await fetch(baseURL + `/?${query}`);
    return await resp.json();
  }

  async getProductById(id: string): Promise<Product> {
    const resp = await fetch(baseURL + `/${id}`);
    return await resp.json();
  }
}


export default new Api();
