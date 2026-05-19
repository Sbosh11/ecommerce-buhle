import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api/categoriesApi";
import { getProducts } from "../api/productsApi";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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

  const newArrivals = useMemo(
    () => products.filter((product) => product.isNew).slice(0, 4),
    [products],
  );

  const featuredProducts = useMemo(() => products.slice(0, 4), [products]);

  const productTypes = useMemo(
    () => categories.filter((category) => category.type === "ProductType"),
    [categories],
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <section className="rounded-4xl overflow-hidden bg-slate-950 text-white shadow-xl">
        <div className="flex flex-col gap-8 px-8 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-16">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400 mb-4">
              Summer Drop 2026
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              The best of Nike, ready to move.
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-300 max-w-xl">
              Discover new arrivals, top-rated categories, and a curated
              selection of performance essentials to kick off your next training
              session.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/sports"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Shop Sports
              </Link>
              <Link
                to="/products/type/clothing"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Browse Clothing
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-96">
            <div className="rounded-3xl bg-white/10 p-6 text-slate-100">
              <p className="text-3xl font-bold">{products.length}</p>
              <p className="mt-2 text-sm text-slate-300">Products</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-6 text-slate-100">
              <p className="text-3xl font-bold">{productTypes.length}</p>
              <p className="mt-2 text-sm text-slate-300">Categories</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-6 text-slate-100">
              <p className="text-3xl font-bold">{newArrivals.length}</p>
              <p className="mt-2 text-sm text-slate-300">New Arrivals</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
              Explore
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              Trending Collections
            </h2>
          </div>
          <Link
            className="text-sm font-medium text-slate-900 underline"
            to="/products/type/clothing"
          >
            View all categories
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {productTypes.slice(0, 3).map((category) => (
            <Link
              key={category.id}
              to={`/products/type/${category.slug}`}
              className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:shadow-lg"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                Collection
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-slate-950">
                {category.name}
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                Explore the best {category.name.toLowerCase()} for training and
                lifestyle.
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
              Featured
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              Home Page Picks
            </h2>
          </div>
          <Link
            className="text-sm font-medium text-slate-900 underline"
            to="/products/new"
          >
            See more products
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
