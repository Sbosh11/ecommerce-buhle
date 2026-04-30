import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link to={`/products/activity/${category.slug}`}>
      <div className="border rounded-lg p-6 hover:bg-gray-100 transition">
        <h2 className="text-xl font-semibold">{category.name}</h2>

        <p className="text-gray-500 mt-2">{category.productCount} products</p>
      </div>
    </Link>
  );
}

export default CategoryCard;
