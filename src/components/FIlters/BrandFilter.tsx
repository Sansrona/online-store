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
    <form className="p-2">
      <p className="uppercase font-medium">Brand</p>
      <ul className="pt-2 flex flex-col max-h-52 overflow-scroll">
        {brands?.map((brand) => {
          return (
            <li className="flex items-center gap-2 hover:bg-slate-200" key={brand}>
              <input
                className="accent-slate-200 transition-colors w-3.5 h-3.5 cursor-pointer"
                type="checkbox"
                name="brand"
                id={brand}
                defaultChecked={brandParams.includes(brand.toLowerCase())}
                value={brand.toLowerCase()}
                onChange={onBrandFilterChange}
              />
              <label className="capitalize cursor-pointer" htmlFor={brand}>{brand}</label>
            </li>
          );
        })}
      </ul>
    </form>
  );
};

export default BrandFilter;
