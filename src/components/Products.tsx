import React, {useState, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {ProductType, SortTypes} from "../api/types";
import Product from "./Product";
import {IoSearch} from "react-icons/io5";

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
    <div
      className="rounded rounded-2xl flex flex-col shadow-custom border-slate-400 flex-grow-1 max-w-full flex-1 py-4 px-8">
      <div className="flex gap-6 justify-center pb-4 items-center">
        <div className="sort">
          <select
            name="sort"
            id="sort"
            defaultValue={sortOption}
            onChange={onChange}
            className="p-1 bg-white border border-slate-300 rounded-md"
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
        <div className="relative">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="border border-slate-300 rounded-md px-2 pl-7 py-0.5"
            defaultValue={searchText}
            onChange={onSearch}
          />
          <IoSearch className="absolute left-2 top-1/4 text-slate-600"/>
        </div>
      </div>
      <div className="products flex flex-wrap justify-center gap-6">
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
