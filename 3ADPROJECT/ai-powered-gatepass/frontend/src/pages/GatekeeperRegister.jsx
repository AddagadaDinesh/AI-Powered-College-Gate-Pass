import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";

function GatekeeperRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.post("/api/auth/gatekeeper-register", form);
      setMessage("✅ Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/gatekeeper-login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || err.response?.data?.error || err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Gatekeeper Register
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-3 border-2 border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-3 border-2 border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="p-3 border-2 border-indigo-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${message.includes("successful") ? "text-green-600" : "text-red-500"
              }`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/gatekeeper-login")}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default GatekeeperRegister;
