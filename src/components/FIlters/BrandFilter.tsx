import React from "react";
import { useSearchParams } from "react-router-dom";

type BrandFilterTypes = {
  brands: string[];
  onBrandFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BrandFilter: React.FC<BrandFilterTypes> = ({
  brands,
  onBrandFilterChange,
}) => {
  const [params] = useSearchParams();
  const [brandParams, setBrandParams] = React.useState<string[]>([]);
  React.useEffect(() => {
    let brandParams = params.get("brand")?.split("↕");
    if (brandParams?.length) {
      setBrandParams(brandParams);
    }
  }, []);
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
              defaultChecked={brandParams.includes(brand.toLowerCase())}
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
