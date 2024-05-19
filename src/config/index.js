const config = {
  api: {
    baseUrl: process.env.REACT_APP_BACKEND_BASE_URL,
  },
  oldBackend: {
    baseUrl: process.env.REACT_APP_OLD_BACKEND_API,
    fetchImageUrl:
      "https://drco-all-backend-617u.onrender.com/image/display?name=",
  },
  google: {
    apiKey: process.env.REACT_APP_MAPS_API_KEY,
  },
};

export default config;
