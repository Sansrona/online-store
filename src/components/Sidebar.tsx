import {observer} from "mobx-react-lite";
import React, {useCallback, useState, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {Filters, SortTypes} from "../api/types";
import {useStore} from "../providers/StoreProvider";
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
  const {productsStore} = useStore();
  const {
    categories,
    brands,
    filterProducts,
    stockValues,
    priceValues,
    currentStockValues,
    currentPriceValues,
    setSearch,
    setSort,
  } = productsStore;

  useEffect(() => {
    let filtration = getFilterFromQuery();
    setFilters(filtration);
  }, []);

  const onCategoryFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let categoryValues = filters.category || [];
    if (e.target.checked) {
      categoryValues.push(e.target.value);
      setFilters({...filters, category: categoryValues});
    } else {
      let newCategories = categoryValues.filter((x) => x !== e.target.value);
      setFilters({...filters, category: newCategories});
    }
  };

  const onBrandFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let brandValues = filters.brand || [];
    if (e.target.checked) {
      brandValues.push(e.target.value);
      setFilters({...filters, brand: brandValues});
    } else {
      let newBrands = brandValues.filter((x) => x !== e.target.value);
      setFilters({...filters, brand: newBrands});
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
    ({min, max}: { min: number; max: number }) => {
      if (
        min !== Number.POSITIVE_INFINITY &&
        max !== Number.NEGATIVE_INFINITY
      ) {
        let arr = [min, max];
        let stock = [Math.min(...arr), Math.max(...arr)];
        setFilters({...filters, stock});
      }
    },
    [filters]
  );
  const onPriceFilterChange = useCallback(
    ({min, max}: { min: number; max: number }) => {
      if (
        min !== Number.POSITIVE_INFINITY &&
        max !== Number.NEGATIVE_INFINITY
      ) {
        let arr = [min, max];
        let price = [Math.min(...arr), Math.max(...arr)];
        setFilters({...filters, price});
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
      } else if (key === "stock" || key === "price") {
        filtration[key as "price" | "stock"] = queryParams[key]
          .split("↕")
          .map((value) => +value);
      } else {
      }
    }
    return filtration;
  };

  const resetFilters = () => {
    const categoryFilters = document.getElementsByName(
      "category"
    ) as NodeListOf<HTMLInputElement>;
    categoryFilters.forEach((item: HTMLInputElement) => {
      item.checked = false;
    });
    const brandFilters = document.getElementsByName(
      "brand"
    ) as NodeListOf<HTMLInputElement>;
    brandFilters.forEach((item: HTMLInputElement) => {
      item.checked = false;
    });
    setFilters({
      category: [],
      brand: [],
      stock: [],
      price: [],
    });
    const sortSelect = document.getElementById("sort") as HTMLSelectElement;
    sortSelect.value = "default";
    const search = document.getElementById("search") as HTMLInputElement;
    search.value = "";
    setSearch("");
    setSort("" as SortTypes.default);
    searchParams.delete("sort");
    searchParams.delete("search");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  useEffect(() => {
    setParams();
    filterProducts(filters);
  }, [filters]);


  return (
    <div className="shadow-custom rounded-2xl max-w-sm flex flex-col h-fit py-4 px-4 flex-grow">
      <div className="flex gap-8 justify-center pb-4">
        <button
          className="bg-red-300 rounded-md p-2 text-sm uppercase font-medium"
          onClick={resetFilters}>Reset
          Filters
        </button>
        <button className="bg-blue-200 rounded-md p-2 text-sm uppercase font-medium"
                onClick={copyLink}>Copy
          Link
        </button>
      </div>
      <CategoryFilter
        categories={categories}
        onCategoryFilterChange={onCategoryFilterChange}
      />
      <hr/>
      <BrandFilter brands={brands} onBrandFilterChange={onBrandFilterChange}/>
      <hr/>
      {priceValues[0] !== Number.POSITIVE_INFINITY && (
        <PriceFilter
          min={priceValues[0]}
          max={priceValues[1]}
          currentPriceValues={currentPriceValues}
          onChange={onPriceFilterChange}
        />
      )}
      <hr/>
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
