import api from "./api";

export const getProducts = async () => {
  const response = await api.get("/Products");
  return response.data;
};

export const getProductBySlug = async (slug) => {
  const response = await api.get("/Products");

  return response.data.find((product) => product.slug === slug);
};
