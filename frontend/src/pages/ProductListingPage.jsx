import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../api/productsApi";
import { getCategories } from "../api/categoriesApi";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import {
  applyFilters,
  buildFilterOptions,
  sortProducts,
} from "../utils/productFilters";

function ProductListingPage() {
  const { slug, type } = useParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  const [filters, setFilters] = useState({
    genders: [],
    categories: [],
    types: [],
    colours: [],
    sizes: [],
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.log(err);
      }
    }

    loadData();
  }, []);

  const selectedCategory = useMemo(() => {
    return categories.find((category) => category.slug === slug);
  }, [categories, slug]);

  const baseProducts = useMemo(() => {
    if (slug === "new") {
      return products.filter((product) => product.isNew);
    }

    if (["men", "women", "kids"].includes(slug)) {
      return products.filter(
        (product) => product.gender.toLowerCase() === slug,
      );
    }

    if (type === "activity") {
      return products.filter(
        (product) => product.categoryId === selectedCategory?.id,
      );
    }

    if (type === "type") {
      return products.filter(
        (product) => product.typeId === selectedCategory?.id,
      );
    }

    return products;
  }, [products, slug, type, selectedCategory]);

  const filterOptions = useMemo(() => {
    return buildFilterOptions(baseProducts, categories);
  }, [baseProducts, categories]);

  const filteredProducts = useMemo(() => {
    const filtered = applyFilters(baseProducts, filters);
    return sortProducts(filtered, sortBy);
  }, [baseProducts, filters, sortBy]);

  const pageTitle =
    selectedCategory?.name || slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <main className="w-full mx-auto px-6 py-10">
      <section className="mb-10 rounded-[2rem] bg-slate-100 px-8 py-10 shadow-sm">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500 mb-3">
            {pageTitle} Collection
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900">
            Discover {pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Explore our curated selection of {pageTitle.toLowerCase()} products,
            designed for style and performance.
          </p>
        </div>
      </section>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">{pageTitle}</h1>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center gap-3"
          >
            <span className="text-sm font-medium">
              {showFilters ? "Hide Filters" : "Show Filters"}
            </span>

            <span
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                showFilters ? "bg-black" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                  showFilters ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </span>
          </button>

          <div className="flex items-center gap-2">
            <label className="font-medium">Sort By</label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="default">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        <ProductFilters
          filters={filters}
          setFilters={setFilters}
          filterOptions={filterOptions}
          showFilters={showFilters}
        />

        <section className="flex-1">
          <p className="text-gray-500 mb-6">
            {filteredProducts.length} products
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductListingPage;
