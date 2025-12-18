import React, { useState } from "react";
import api from "../pages/api";

function RegistrationForm({ title, role }) {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    branch: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // attach role and send to backend
      const userData = { ...formData, role };

      const response = await api.post("/api/auth/register", userData);

      console.log("Registered successfully:", response.data);
      alert("Registration successful");

      // clear form after success
      setFormData({
        name: "",
        rollNo: "",
        branch: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          {/* Student-only fields */}
          {role === "student" && (
            <>
              <input
                type="text"
                name="rollNo"
                placeholder="Roll No"
                value={formData.rollNo}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="branch"
                placeholder="Branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
