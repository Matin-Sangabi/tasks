import axios from "axios";
import Cookies from "js-cookie";
const baseURL: string | undefined = import.meta.env.VITE_ENDPOINT_URL;

const app = axios.create({
  baseURL,
});

app.interceptors.request.use((config) => {
  const token = Cookies.get("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const http = {
  get: app.get,
  post: app.post,
  put: app.put,
  delete: app.delete,
  patch: app.patch,
};

export default http;