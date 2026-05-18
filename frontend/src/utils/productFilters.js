export function buildFilterOptions(products, categories) {
  const genders = [...new Set(products.map((p) => p.gender))];

  const categoryIds = [...new Set(products.map((p) => p.categoryId))];
  const typeIds = [...new Set(products.map((p) => p.typeId))];

  const colours = [
    ...new Set(
      products.flatMap((product) =>
        product.variants.map((variant) => variant.colour),
      ),
    ),
  ];

  const clothingType = categories.find(
    (category) => category.slug === "clothing" || category.name === "Clothing",
  );

  const clothingSizeSet = new Set();
  const numericSizeSet = new Set();

  products.forEach((product) => {
    const isClothing = clothingType && product.typeId === clothingType.id;

    product.variants.forEach((variant) => {
      variant.sizes.forEach((size) => {
        if (isClothing) {
          clothingSizeSet.add(size.size);
        } else {
          numericSizeSet.add(size.size);
        }
      });
    });
  });

  const clothingSizes = ["S", "M", "L"].filter((size) =>
    clothingSizeSet.has(size),
  );

  const numericSizes = [...numericSizeSet].sort((a, b) => {
    const aNum = Number(a);
    const bNum = Number(b);

    if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
      return aNum - bNum;
    }

    return a.localeCompare(b);
  });

  return {
    genders: genders.map((gender) => ({
      label: gender,
      value: gender,
    })),

    categories: categoryIds.map((id) => {
      const category = categories.find((c) => c.id === id);

      return {
        label: category?.name || `Category ${id}`,
        value: id,
      };
    }),

    types: typeIds.map((id) => {
      const type = categories.find((c) => c.id === id);

      return {
        label: type?.name || `Type ${id}`,
        value: id,
      };
    }),

    colours: colours.map((colour) => ({
      label: colour,
      value: colour,
    })),

    sizes: {
      clothing: clothingSizes.map((size) => ({ label: size, value: size })),
      numeric: numericSizes.map((size) => ({ label: size, value: size })),
    },
  };
}

export function applyFilters(products, filters) {
  return products.filter((product) => {
    const matchesGender =
      filters.genders.length === 0 || filters.genders.includes(product.gender);

    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.categoryId);

    const matchesType =
      filters.types.length === 0 || filters.types.includes(product.typeId);

    const matchesColour =
      filters.colours.length === 0 ||
      product.variants.some((variant) =>
        filters.colours.includes(variant.colour),
      );

    const matchesSize =
      filters.sizes.length === 0 ||
      product.variants.some((variant) =>
        variant.sizes.some((size) => filters.sizes.includes(size.size)),
      );

    return (
      matchesGender &&
      matchesCategory &&
      matchesType &&
      matchesColour &&
      matchesSize
    );
  });
}

export function sortProducts(products, sortBy) {
  const sorted = [...products];

  switch (sortBy) {
    case "price-low-high":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-high-low":
      return sorted.sort((a, b) => b.price - a.price);

    case "name-a-z":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "name-z-a":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));

    default:
      return sorted;
  }
}
