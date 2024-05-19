import axios from "axios";

// Create instance called instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
});

// Set the AUTH token for any request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//  dont thow error on 4XX status codes
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
