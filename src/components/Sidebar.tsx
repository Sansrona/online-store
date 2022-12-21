import { observer } from "mobx-react-lite";
import React, { useCallback, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filters } from "../api/types";
import { useStore } from "../providers/StoreProvider";
import {
  BrandFilter,
  CategoryFilter,
  StockFilter,
  PriceFilter,
} from "./FIlters";

const Sidebar = observer(() => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    category: [],
    brand: [],
    stock: [],
    price: [],
  });
  const { productsStore } = useStore();
  const {
    categories,
    brands,
    filterProducts,
    stockValues,
    priceValues,
    currentStockValues,
    currentPriceValues,
  } = productsStore;

  useEffect(() => {
    let filtration = getFilterFromQuery();
    setFilters(filtration);
  }, []);

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
      searchParams.delete(key);
      if (
        filters[key as keyof Filters] &&
        filters[key as keyof Filters]!.length > 0
      ) {
        searchParams.set(key, filters[key as keyof Filters]?.join("↕")! || "");
      }
    }
    setSearchParams(searchParams);
  };

  const onStockFilterChange = useCallback(
    ({ min, max }: { min: number; max: number }) => {
      if (
        min !== Number.POSITIVE_INFINITY &&
        max !== Number.NEGATIVE_INFINITY
      ) {
        let arr = [min, max];
        let stock = [Math.min(...arr), Math.max(...arr)]
        setFilters({ ...filters, stock });
      }
    },
    [filters]
  );
  const onPriceFilterChange = useCallback(
    ({ min, max }: { min: number; max: number }) => {
      if (
        min !== Number.POSITIVE_INFINITY &&
        max !== Number.NEGATIVE_INFINITY
      ) {
        let arr = [min, max];
        let price = [Math.min(...arr), Math.max(...arr)]
        setFilters({ ...filters, price});
      }
    },
    [filters]
  );

  const getFilterFromQuery = () => {
    let queryParams = Object.fromEntries([...searchParams]);
    let filtration: Filters = {};
    for (let key in queryParams) {
      if (key === "category" || key === "brand") {
        filtration[key as "brand" | "category"] = queryParams[key].split("↕");
      } else {
        filtration[key as "price" | "stock"] = queryParams[key]
          .split("↕")
          .map((value) => +value);
      }
    }
    return filtration;
  };

  useEffect(() => {
    setParams();
    filterProducts(filters);
    
  }, [filters]);

  return (
    <div className="sidebar">
      <CategoryFilter
        categories={categories}
        onCategoryFilterChange={onCategoryFilterChange}
      />
      <BrandFilter brands={brands} onBrandFilterChange={onBrandFilterChange} />
      {priceValues[0] !== Number.POSITIVE_INFINITY && (
        <PriceFilter
          min={priceValues[0]}
          max={priceValues[1]}
          currentPriceValues={currentPriceValues}
          onChange={onPriceFilterChange}
        />
      )}
      {stockValues[0] !== Number.POSITIVE_INFINITY && (
        <StockFilter
          min={stockValues[0]}
          max={stockValues[1]}
          currentStockValues={currentStockValues}
          onChange={onStockFilterChange}
        />
      )}
    </div>
  );
});

export default Sidebar;
