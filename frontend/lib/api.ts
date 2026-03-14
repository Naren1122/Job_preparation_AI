// API Client with Axios
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://job-preparation-ai-3.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important: allows cookies to be sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token from cookies
// Note: Since we're using HTTP-only cookies, we don't need to manually add the token
// The browser automatically sends cookies with requests to the same domain

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - could redirect to login or dispatch logout
      console.error("Unauthorized - token may be invalid or expired");
    }
    return Promise.reject(error);
  },
);

export default api;
