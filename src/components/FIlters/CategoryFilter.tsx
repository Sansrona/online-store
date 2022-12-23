import React from "react";
import { useSearchParams } from "react-router-dom";

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
    <form>
      <p>Category</p>
      {categories?.map((category) => {
        return (
          <div key={category}>
            <input
              type="checkbox"
              name="category"
              defaultChecked={categoryParams.includes(category.toLowerCase())}
              value={category.toLowerCase()}
              onChange={onCategoryFilterChange}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        );
      })}
    </form>
  );
};

export default CategoryFilter;
