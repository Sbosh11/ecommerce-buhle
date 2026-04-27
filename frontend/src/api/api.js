import axios from "axios";

const api = axios.create({
  baseURL:
    "https://portfolio-api-hphge3fpevdzgrcp.southafricanorth-01.azurewebsites.net/api",
});

export default api;
