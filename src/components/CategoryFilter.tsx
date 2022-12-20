import React from "react";

type CategoryFilterTypes = {
  categories: string[];
  onCategoryFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

const CategoryFilter: React.FC<CategoryFilterTypes> = ({ categories, onCategoryFilterChange }) => {
  

  return (
    <form>
      <p>Category</p>
      {categories?.map((category) => {
        return (
          <div key={category}>
            <input
              type="checkbox"
              name="category"
              id={category}
              value={category}
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
