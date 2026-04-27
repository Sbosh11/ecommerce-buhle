import { useEffect, useState } from "react";
import api from "./api/api";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
