import React from "react";
import {useSearchParams} from "react-router-dom";

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
    <form className="border border-amber-600 p-2">
      <p className="text-center border border-amber-800">Brand</p>
      <ul className="flex flex-col max-h-52 overflow-scroll">
        {brands?.map((brand) => {
          return (
            <li className="flex items-center gap-2" key={brand}>
              <input
                type="checkbox"
                name="category"
                defaultChecked={brandParams.includes(brand.toLowerCase())}
                value={brand.toLowerCase()}
                onChange={onBrandFilterChange}
              />
              <label htmlFor={brand}>{brand}</label>
            </li>
          );
        })}
      </ul>
    </form>
  );
};

export default BrandFilter;
