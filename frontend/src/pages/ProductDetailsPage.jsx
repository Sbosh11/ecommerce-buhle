import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../api/productsApi";

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

      <section>
        <p className="text-gray-500">{product.brand}</p>

        <h1 className="text-4xl font-bold mt-2">{product.name}</h1>

        <p className="mt-4 text-gray-700">{product.description}</p>

        <p className="text-2xl font-bold mt-6">
          R{selectedSize?.price || product.price}
        </p>

        <div className="mt-8">
          <h2 className="font-semibold mb-3">Colour</h2>

          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => handleVariantChange(variant)}
                className={`border px-4 py-2 rounded ${
                  selectedVariant?.id === variant.id
                    ? "border-black"
                    : "border-gray-300"
                }`}
              >
                {variant.colour}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-semibold mb-3">Size</h2>

          <div className="flex flex-wrap gap-3">
            {selectedVariant?.sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size)}
                className={`border px-4 py-2 rounded ${
                  selectedSize?.id === size.id
                    ? "border-black"
                    : "border-gray-300"
                }`}
              >
                {size.size}
              </button>
            ))}
          </div>
        </div>

        <button className="mt-10 w-full bg-black text-white py-4 rounded-lg font-semibold">
          Add to Bag
        </button>
      </section>
    </main>
  );
}

export default ProductDetailPage;
