import axios from "axios";

// Determine the base URL based on environment OR fallback to production URL
const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const API_BASE_URL = isLocalhost
    ? "http://localhost:5000"
    : (process.env.REACT_APP_API_URL || "https://ai-powered-college-gate-pass-3.onrender.com");

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Automatically add the token to every request if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
export { API_BASE_URL };
