import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../api/productsApi";

const swatchColorClasses = {
  Black: "bg-slate-900 text-white border-slate-900",
  White: "bg-white text-slate-900 border-slate-300",
  Blue: "bg-sky-700 text-white border-sky-700",
  Pink: "bg-pink-400 text-white border-pink-400",
  Red: "bg-red-500 text-white border-red-500",
  Green: "bg-emerald-500 text-white border-emerald-500",
  Grey: "bg-slate-400 text-slate-900 border-slate-400",
};

function ProductDetailPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProducts();
        const foundProduct = data.find((item) => item.slug === slug);

        setProduct(foundProduct);
        setSelectedVariant(foundProduct?.variants?.[0] || null);
        setSelectedSize(foundProduct?.variants?.[0]?.sizes?.[0] || null);
      } catch (err) {
        console.log(err);
      }
    }

    loadProduct();
  }, [slug]);

  function handleVariantChange(variant) {
    setSelectedVariant(variant);
    setSelectedSize(variant.sizes?.[0] || null);
  }

  if (!product) {
    return <main className="p-6">Loading...</main>;
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <img
          src={selectedVariant?.imageUrl}
          alt={product.name}
          className="w-full rounded-lg border"
        />
      </div>

      <section className="text-left max-w-md">
        <p className="text-gray-500">{product.brand}</p>

        <h1 className="text-2xl md:text-3xl font-bold mt-2">{product.name}</h1>

        <p className="mt-4 text-gray-700">{product.description}</p>

        <p className="text-2xl font-bold mt-6">
          R{selectedSize?.price || product.price}
        </p>

        <div className="mt-8">
          <h2 className="font-semibold mb-3">Colour</h2>

          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant) => {
              const swatchClasses =
                swatchColorClasses[variant.colour] ||
                "bg-slate-200 text-slate-900 border-slate-300";

              return (
                <button
                  key={variant.id}
                  onClick={() => handleVariantChange(variant)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${swatchClasses} ${
                    selectedVariant?.id === variant.id
                      ? "ring-2 ring-black/10 shadow-sm"
                      : "hover:ring-1 hover:ring-slate-300/70"
                  }`}
                >
                  {variant.colour}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-semibold mb-3">Select Size</h2>

          <div className="flex flex-wrap gap-3">
            {selectedVariant?.sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size)}
                className={`border px-4 py-2 rounded ${
                  selectedSize?.id === size.id
                    ? "border-black bg-slate-900 text-white"
                    : "border-gray-300 bg-white text-slate-900"
                }`}
              >
                {size.size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 mx-auto flex max-w-[220px] flex-col gap-3">
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-center font-semibold text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M6 6h15l-1.5 9H7.5L6 6Zm3 11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
            </svg>
            Add to Bag
          </button>
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-center font-semibold text-slate-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M12 20s-6-4.35-9-7.47C1.3 9.8 2.6 7 5.55 7 7.24 7 8.73 8 9.5 9.28 10.27 8 11.76 7 13.45 7 16.4 7 17.7 9.8 16.99 12.53 14.86 15.65 12 20 12 20Z" />
            </svg>
            Favorite
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductDetailPage;
