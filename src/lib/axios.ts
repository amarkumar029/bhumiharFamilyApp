import axios from "axios";

export const api = axios.create({
  baseURL: "https://your-api-url.com", // change to your backend
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add token interceptor for RN
api.interceptors.request.use(async (config) => {
  try {
    const token = ""; // later replace with AsyncStorage value
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {}

  return config;
});
