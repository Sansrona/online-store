import { ProductType, Products } from "./types";

const baseURL = "https://dummyjson.com/products";

class Api {
  async getAllProducts(): Promise<Products> {
    const resp = await fetch(baseURL + "?limit=100");
    return await resp.json();
  }

  async getFilteredProducts(query: string): Promise<Products> {
    const resp = await fetch(baseURL + `/?${query}`);
    return await resp.json();
  }

  async getProductById(id: string): Promise<ProductType | null> {
    try {
      const resp = await fetch(baseURL + `/${id}`);
      if(resp.ok) return await resp.json();
      else return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export default new Api();
