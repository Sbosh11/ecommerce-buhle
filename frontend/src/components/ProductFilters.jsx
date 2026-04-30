import { useState } from "react";

function ProductFilters({ filters, setFilters, filterOptions, showFilters }) {
 const [openGroups, setOpenGroups] = useState({
  gender: false,
  category: false,
  type: false,
  colour: false,
  size: false,
});

  if (!showFilters) return null;

  function toggleGroup(groupName) {
    setOpenGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  }

  function handleCheckboxChange(filterName, value) {
    setFilters((prev) => {
      const currentValues = prev[filterName];

      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [filterName]: updatedValues,
      };
    });
  }

  return (
    <aside className="w-64 shrink-0 border-r pr-6">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <FilterGroup
        title="Gender"
        isOpen={openGroups.gender}
        onToggle={() => toggleGroup("gender")}
        items={filterOptions.genders}
        selectedItems={filters.genders}
        onChange={(value) => handleCheckboxChange("genders", value)}
      />

      <FilterGroup
        title="Category"
        isOpen={openGroups.category}
        onToggle={() => toggleGroup("category")}
        items={filterOptions.categories}
        selectedItems={filters.categories}
        onChange={(value) => handleCheckboxChange("categories", value)}
      />

      <FilterGroup
        title="Type"
        isOpen={openGroups.type}
        onToggle={() => toggleGroup("type")}
        items={filterOptions.types}
        selectedItems={filters.types}
        onChange={(value) => handleCheckboxChange("types", value)}
      />

      <FilterGroup
        title="Colour"
        isOpen={openGroups.colour}
        onToggle={() => toggleGroup("colour")}
        items={filterOptions.colours}
        selectedItems={filters.colours}
        onChange={(value) => handleCheckboxChange("colours", value)}
      />

      <FilterGroup
        title="Size"
        isOpen={openGroups.size}
        onToggle={() => toggleGroup("size")}
        items={filterOptions.sizes}
        selectedItems={filters.sizes}
        onChange={(value) => handleCheckboxChange("sizes", value)}
      />
    </aside>
  );
}

function FilterGroup({
  title,
  isOpen,
  onToggle,
  items,
  selectedItems,
  onChange,
}) {
  return (
    <div className="border-b py-4">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between font-semibold"
      >
        <span>{title}</span>

        <span className="text-xl leading-none">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <label
              key={item.value}
              className="flex items-center gap-3 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item.value)}
                onChange={() => onChange(item.value)}
                className="h-4 w-4 accent-black"
              />

              <span>{item.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductFilters;
