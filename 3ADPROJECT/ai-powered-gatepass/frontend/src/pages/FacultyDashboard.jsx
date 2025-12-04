import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FacultyDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/faculty-login");
    } else {
      fetchLeaves(token);
    }
  }, [navigate]);

  const fetchLeaves = async (token) => {
    try {
      const res = await axios.get("http://localhost:5000/api/faculty/leaves", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(res.data.leaves || []);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Failed to fetch leave requests");
    }
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:5000/api/faculty/leave/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(`Leave ${status} successfully`);
      if (res.data.studentMessage) alert(res.data.studentMessage);

      fetchLeaves(token);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Failed to update status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/faculty-login");
  };
  const goHome = () => {
    navigate("/"); // Adjust route if homepage path is different
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center p-8">
      {/* Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6 text-white">
        <h1 className="text-3xl font-extrabold">Faculty Dashboard</h1>
        <button
            onClick={goHome}
            className="bg-white text-purple-600 px-4 py-2 rounded shadow hover:bg-purple-600 hover:text-white transition-all"
          >
            Home
          </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Message */}
      {message && (
        <p className="bg-white text-green-700 p-2 rounded mb-4 shadow">{message}</p>
      )}

      {/* Leave Requests Table */}
      <div className="w-full max-w-5xl bg-white p-6 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">
          Student Leave Requests
        </h2>

        {leaves.length === 0 ? (
          <p className="text-gray-600">No leave requests yet.</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-indigo-100 text-gray-700">
              <tr>
                <th className="border p-2">Student</th>
                <th className="border p-2">Roll No</th>
                <th className="border p-2">Branch</th>
                <th className="border p-2">From</th>
                <th className="border p-2">To</th>
                <th className="border p-2">Reason</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-100">
                  <td className="border p-2">{leave.user?.name || "N/A"}</td>
                  <td className="border p-2">{leave.user?.rollNo || "N/A"}</td>
                  <td className="border p-2">{leave.branch || "N/A"}</td>
                  <td className="border p-2">{leave.from_date}</td>
                  <td className="border p-2">{leave.to_date}</td>
                  <td className="border p-2">{leave.reason}</td>
                  <td className="border p-2 capitalize font-semibold text-indigo-700">
                    {leave.status}
                  </td>
                  <td className="border p-2 flex gap-2">
                    {leave.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(leave.id, "approved")}
                          className="bg-green-500 text-white px-3 py-1 rounded-xl hover:bg-green-600 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(leave.id, "rejected")}
                          className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600 transition"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FacultyDashboard;
