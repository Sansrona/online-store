import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ProductType, SortTypes } from "../api/types";
import Product from "./Product";

type ProductsPageType = {
  products: ProductType[];
  sort: (sortOption: SortTypes) => void;
  setSearch: (searchParam: string) => void;
};

const sortArr = [
  "rating-ASC",
  "rating-DESC",
  "price-ASC",
  "price-DESC",
  "discount-ASC",
  "discount-DESC",
];

const Products: React.FC<ProductsPageType> = ({
  products,
  sort: onSortChange,
  setSearch,
}) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState(
    searchParams.get("sort") || "default"
  );
  const [searchText, setSearchText] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    onSortChange(sortOption as SortTypes);
    searchParams.set("sort", sortOption);
    setSearchParams(searchParams);
  }, [sortOption]);

  useEffect(() => {
    setSearch(searchText.toLowerCase());
    searchParams.set("search", searchText);
    setSearchParams(searchParams);
  }, [searchText]);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="main">
      <div className="main__header">
        <div className="sort">
          <select
            name="sort"
            id="sort"
            defaultValue={sortOption}
            onChange={onChange}
          >
            <option value="default" disabled>
              Sort options:
            </option>
            {sortArr.map((sortItem) => (
              <option value={sortItem} key={sortItem}>
                Sort by {sortItem.split("-").join(" ")}
              </option>
            ))}
          </select>
        </div>
        <div className="seacrh">
          <input
            type="text"
            name="search"
            id="search"
            defaultValue={searchText}
            onChange={onSearch}
          />
        </div>
      </div>
      <div className="products">
        {products.length ? (
          products.map((product) => (
            <Product key={product.id} product={product}/>
          ))
        ) : (
          <h2>NO such products</h2>
        )}
      </div>
    </div>
  );
};

export default Products;
