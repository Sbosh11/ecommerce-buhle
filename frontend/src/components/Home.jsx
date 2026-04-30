import { useEffect, useState } from "react";
import api from "../api/api";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get("/Products"),
          api.get("/Categories"),
        ]);

        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.log(err);
      }
    }

    loadData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Categories</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        {categories.map((category) => (
          <button key={category.id}>
            {category.name} ({category.productCount})
          </button>
        ))}
      </div>

      <h1>Products</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            <img
              src={product.thumbnailUrl}
              alt={product.name}
              style={{ width: "100%" }}
            />

            <h3>{product.name}</h3>
            <p>{product.brand}</p>
            <p>{product.gender}</p>
            <p>R{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
