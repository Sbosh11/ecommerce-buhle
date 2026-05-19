import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import SportsPage from "./pages/SportsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/products/:slug" element={<ProductListingPage />} />
        <Route path="/products/:type/:slug" element={<ProductListingPage />} />

        <Route path="/sports" element={<SportsPage />} />
        <Route path="/product/:slug" element={<ProductDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
