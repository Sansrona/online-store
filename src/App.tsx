import React from "react";
import { Link, useSearchParams, createSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Filters, Product } from "./api/types";
import { useQueryFilter } from "./utils/QueryFilter";

import "./App.scss";
import { useStore } from "./providers/StoreProvider";

const App: React.FC = observer(() => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { productsStore } = useStore();
  const {
    allProducts: products,
    categories,
    brands,
    filterProducts,
  } = productsStore;
  const query = useQueryFilter();
  const [filters, setFilters] = React.useState<Filters>({
    category: [],
    brand: [],
    stock: [],
    price: [],
  });

  const onCategoryFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let categoryValues = filters.category!;
    if (e.target.checked) {
      categoryValues.push(e.target.value);
      setFilters({ ...filters, category: categoryValues });
    } else {
      let newCategories = categoryValues.filter((x) => x !== e.target.value);
      setFilters({ ...filters, category: newCategories });
    }
  };

  const onBrandFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let brandValues = filters.brand!;
    if (e.target.checked) {
      brandValues.push(e.target.value);
      setFilters({ ...filters, brand: brandValues });
    } else {
      let newBrands = brandValues.filter((x) => x !== e.target.value);
      setFilters({ ...filters, brand: newBrands });
    }
  };

  const setParams = () => {
    for (let key in filters) {
      if (
        filters[key as keyof Filters] &&
        filters[key as keyof Filters]!.length > 0
      ) {
        searchParams.set(key, filters[key as keyof Filters]?.join("↕")! || "");
      }
    }
    // console.log(searchParams);
    setSearchParams(searchParams);
  };

  React.useEffect(() => {
    productsStore.getAllProducts();
    // console.log(searchParams);
  }, []);

  React.useEffect(() => {
    filterProducts(filters);
    // setParams();
  }, [filters]);

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
                value={brand.toLowerCase()}
                onChange={onBrandFilterChange}
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
