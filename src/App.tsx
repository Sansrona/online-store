import React from "react";
import { Link } from "react-router-dom";

import Api from "./api/";
import { Filters, Product } from "./api/types";

import "./App.scss";

const App: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<string[]>();
  const [filters, setFilters] = React.useState<Filters>({
    category: [],
    brand: [],
  });

  const onCategoryFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let categoryValues = filters.category;
    if (e.target.checked) {
      categoryValues.push(e.target.value);
      setFilters({ ...filters, category: categoryValues });
    } else {
      let newCategories = categoryValues.filter((x) => x !== e.target.value);
      setFilters({ ...filters, category: newCategories });
    }
  };

  React.useEffect(() => {
    Api.getAllProducts().then(({ products: data }) => {
      setProducts(data);
      const categories = new Set(data.map((product) => product.category));
      setCategories(Array.from(categories));
    });
  }, []);

  return (
    <div className="App">
      <form>
        <p>Category</p>
        {categories?.map((category) => {
          return (
            <div key={category}>
              <input
                type="checkbox"
                name="category"
                id={category}
                value={category}
                onChange={onCategoryFilterChange}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          );
        })}
      </form>
      <div>
        {products?.map((product) => (
          <p key={product.id}>{product.title}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
