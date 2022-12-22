export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export type Filters = {
    brand?: string[];
    category?: string[];
    stock?: number[];
    price?: number[];
};

export interface Products {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export enum SortTypes {
  ratingASC = "rating-ASC",
  ratingDESC = "rating-DESC",
  priceASC = "price-ASC",
  priceDESC = "price-DESC",
  discountASC = "discount-ASC",
  discountDESC = "discount-DESC",
  default = ''
}