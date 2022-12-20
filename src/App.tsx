import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Filters } from "./api/types";
import { useQueryFilter } from "./utils/QueryFilter";

import "./App.scss";
import { useStore } from "./providers/StoreProvider";
import { BrandFilter, CategoryFilter, StockFilter } from "./components";
import PriceFilter from "./components/PriceFilter";

const App: React.FC = observer(() => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { productsStore } = useStore();
  const {
    allProducts: products,
    categories,
    brands,
    filterProducts,
    stockValues,
    priceValues,
    currentStockValues,
    currentPriceValues
  } = productsStore;
  const query = useQueryFilter();
  const [filters, setFilters] = React.useState<Filters>({
    category: [],
    brand: [],
    stock: [],
    price: [],
  });

  const onCategoryFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let categoryValues = filters.category || [];
    if (e.target.checked) {
      categoryValues.push(e.target.value);
      setFilters({ ...filters, category: categoryValues });
    } else {
      let newCategories = categoryValues.filter((x) => x !== e.target.value);
      setFilters({ ...filters, category: newCategories });
    }
  };

  const onBrandFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let brandValues = filters.brand || [];
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
  }, []);

  React.useEffect(() => {
    filterProducts(filters);
    console.log(currentStockValues, currentPriceValues);
    
    // setParams();
  }, [filters]);

  const onStockFilterChange = useCallback(
    ({ min, max }: { min: number; max: number }) => {
      setFilters({ ...filters, stock: [min, max] });
    },
    [filters]
  );

  function onPriceFilterChange({ min, max }: { min: number; max: number }) {
    setFilters({ ...filters, price: [min, max] });
  }

  return (
    <div className="App">
      {/* <CategoryFilter
        categories={categories}
        onCategoryFilterChange={onCategoryFilterChange}
      /> */}
      {/* <BrandFilter brands={brands} onBrandFilterChange={onBrandFilterChange} /> */}
      {stockValues[0] !== Number.POSITIVE_INFINITY && (
        <StockFilter
          min={stockValues[0]}
          max={stockValues[1]}
          currentStockValues={currentStockValues}
          onChange={onStockFilterChange}
        />
      )}
      {priceValues[0] !== Number.POSITIVE_INFINITY && (
        <PriceFilter
          min={priceValues[0]}
          max={priceValues[1]}
          currentPriceValues={currentPriceValues}
          onChange={onPriceFilterChange}
        />
      )}
      <div>
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
    </div>
  );
});

export default App;
