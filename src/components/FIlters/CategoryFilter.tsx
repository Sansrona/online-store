import React from "react";
import {useSearchParams} from "react-router-dom";

type CategoryFilterTypes = {
  categories: string[];
  onCategoryFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CategoryFilter: React.FC<CategoryFilterTypes> = ({
                                                         categories,
                                                         onCategoryFilterChange,
                                                       }) => {
  const [params] = useSearchParams();
  const [categoryParams, setCategoryParams] = React.useState<string[]>([]);
  React.useEffect(() => {
    let categoryParams = params.get("category")?.split("↕");
    if (categoryParams?.length) {
      setCategoryParams(categoryParams);
    }
  }, []);

  return (
    <form className="p-2">
      <p className="uppercase font-medium">Category</p>
      <ul className="pt-2 flex flex-col max-h-52 overflow-scroll">
        {categories?.map((category) => {
          return (
            <li className="flex items-center gap-2 hover:bg-slate-200" key={category}>
              <input
                className="accent-slate-200 transition-colors w-3.5 h-3.5 cursor-pointer"
                type="checkbox"
                name="category"
                id={category}
                defaultChecked={categoryParams.includes(category.toLowerCase())}
                value={category.toLowerCase()}
                onChange={onCategoryFilterChange}
              />
              <label className="capitalize cursor-pointer" htmlFor={category}>{category}</label>
            </li>
          );
        })}
      </ul>
    </form>
  );
};

export default CategoryFilter;
