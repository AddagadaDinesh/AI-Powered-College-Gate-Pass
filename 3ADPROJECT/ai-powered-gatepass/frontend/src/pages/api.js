import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-powered-college-gate-pass-3.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
