import { Products } from "./types";

const baseURL = "https://dummyjson.com/products?limit=100";

class Api {
  async getAllProducts(): Promise<Products> {
    const resp = await fetch(baseURL);
    return await resp.json()
  }
}

export default Api;
