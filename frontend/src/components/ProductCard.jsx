import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition bg-white">
        <img
          src={product.thumbnailUrl}
          alt={product.name}
          className="w-full h-72 object-cover"
        />

        <div className="p-4">
          <h2 className="font-semibold text-lg">{product.name}</h2>

          <p className="text-gray-500 text-sm">{product.brand}</p>

          <p className="text-sm mt-1">{product.gender}</p>

          <p className="font-bold mt-2">R{product.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
