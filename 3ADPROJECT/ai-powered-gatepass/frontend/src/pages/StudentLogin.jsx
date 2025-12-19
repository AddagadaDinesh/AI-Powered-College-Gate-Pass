import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // 👁️ eye icon library

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
        role: "student",
      });

      const { token, user, message } = res.data;

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setMessage(message || "Login successful!");
        navigate("/student-dashboard");
      } else {
        setMessage("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error context:", {
        apiUrl: `${api.defaults.baseURL}/api/auth/login`,
        error: err,
        response: err.response?.data
      });

      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message;
      setMessage(errorMsg === "Network Error" ? "Cannot connect to server. Is the backend running?" : errorMsg || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Student Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Field */}
          <input
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Field with Eye Icon */}
          <div className="relative">
            <input
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Message Display */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${message.toLowerCase().includes("fail") ||
              message.toLowerCase().includes("error")
              ? "text-red-500"
              : "text-green-600"
              }`}
          >
            {message}
          </p>
        )}

        {/* Navigation */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/student-register")}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default StudentLogin;
