import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Api from "./api/";
import { Filters, Product } from "./api/types";
import { useQueryFilter } from "./utils/QueryFilter";

import "./App.scss";
import { useStore } from "./providers/StoreProvider";

const App: React.FC = observer(() => {
  const { productsStore } = useStore();
  const { products, categories, brands } = productsStore;
  const query = useQueryFilter();
  const [filters, setFilters] = React.useState<Filters>({
    category: [],
    brand: [],
  });

  const onCategoryFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let categoryValues = filters.category;
    if (e.target.checked) {
      categoryValues.push(e.target.value);
      query.append("category", e.currentTarget.value);
      setFilters({ ...filters, category: categoryValues });
    } else {
      let newCategories = categoryValues.filter((x) => x !== e.target.value);
      setFilters({ ...filters, category: newCategories });
    }
  };

  React.useEffect(() => {
    productsStore.getAllProducts();
    console.log(query);
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
      <form>
        <p>Brand</p>
        {brands?.map((brand) => {
          return (
            <div key={brand}>
              <input
                type="checkbox"
                name="category"
                id={brand}
                value={brand}
                onChange={onCategoryFilterChange}
              />
              <label htmlFor={brand}>{brand}</label>
            </div>
          );
        })}
      </form>
      <div>
        {products.map((product) => (
          <p key={product.id}>{product.title}</p>
        ))}
      </div>
    </div>
  );
});

export default App;
