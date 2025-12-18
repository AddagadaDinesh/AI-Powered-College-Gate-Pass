import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // 👁 icon library
import { API_BASE_URL } from "../apiConfig";

function StudentRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
        rollNo,
        role: "student",
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage(res.data.message);
      navigate("/student-dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || err.response?.data?.error || err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Student Registration
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <input
            type="text"
            placeholder="Roll Number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition">
            Register
          </button>
        </form>

        {message && (
          <p
            className={`mt - 4 text - center font - medium ${message.toLowerCase().includes("fail") || message.toLowerCase().includes("not match")
              ? "text-red-500"
              : "text-green-600"
              }`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/student-login")}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default StudentRegister;
