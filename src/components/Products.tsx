import React from "react";
import { Product } from "../api/types";

type ProductsPageType = {
  products: Product[];
};

const Products: React.FC<ProductsPageType> = ({ products }) => {
  return (
    <div className="products">
      {products.length ? (
        products.map((product) => (
          <p key={product.id}>
            {product.title}price{product.price}
          </p>
        ))
      ) : (
        <h2>NO such products</h2>
      )}
    </div>
  );
};

export default Products;
