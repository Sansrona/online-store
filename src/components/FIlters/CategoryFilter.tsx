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
    <form className="border border-amber-600 p-2">
      <p className="text-center border border-amber-800">Category</p>
      <ul className="flex flex-col max-h-52 overflow-scroll">
        {categories?.map((category) => {
          return (
            <li className="flex items-center gap-2" key={category}>
              <input
                type="checkbox"
                name="category"
                defaultChecked={categoryParams.includes(category.toLowerCase())}
                value={category.toLowerCase()}
                onChange={onCategoryFilterChange}
              />
              <label htmlFor={category}>{category}</label>
            </li>
          );
        })}
      </ul>
    </form>
  );
};

export default CategoryFilter;
