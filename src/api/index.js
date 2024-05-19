import axios from "axios";
import config from "../config";

const api = axios.create({
  baseURL: `${config.api.baseUrl}/api`,
});

//  Add authorization header to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// OLD BACKEND
// console.log("API", config.oldBackend.baseUrl);
export const oldBackend = axios.create({
  baseURL: `${config.oldBackend.baseUrl}`,
});

export default api;
