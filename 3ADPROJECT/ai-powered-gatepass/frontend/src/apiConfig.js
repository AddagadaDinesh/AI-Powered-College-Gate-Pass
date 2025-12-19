const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
export const API_BASE_URL = isLocalhost
    ? "http://localhost:5000"
    : (process.env.REACT_APP_API_URL || "https://ai-powered-college-gate-pass-3.onrender.com");
