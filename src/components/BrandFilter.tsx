import React from "react";

type BrandFilterTypes = {
  brands: string[];
  onBrandFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

const BrandFilter: React.FC<BrandFilterTypes> = ({ brands, onBrandFilterChange }) => {
  

  return (
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
  );
};

export default BrandFilter;
