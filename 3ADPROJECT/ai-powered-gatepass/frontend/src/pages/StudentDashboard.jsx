import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const [student, setStudent] = useState({});
  const [branch, setBranch] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  // Load student data
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/student-login");
      return;
    }

    const user = JSON.parse(storedUser);
    setStudent(user);
    setBranch(user.branch || "");
    fetchMyLeaves(token);
  }, [navigate]);

  // Fetch student leaves
  const fetchMyLeaves = async (token) => {
    try {
      const res = await api.get("/api/student/leaves");
      setLeaves(res.data.leaves || []);
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to fetch leaves");
    }
  };

  // Submit leave
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setQrCode(null);

    const token = localStorage.getItem("token");
    if (!token) return setMessage("Unauthorized. Please login again.");

    try {
      const leaveData = {
        branch,
        from_date: fromDate,
        to_date: toDate,
        reason: leaveReason,
      };

      const res = await api.post("/api/student/leave", leaveData);

      setMessage(res.data.message);
      setLeaveReason("");
      setFromDate("");
      setToDate("");
      setShowForm(false);

      if (res.data.leave?.qr_token) {
        setQrCode(
          `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
            res.data.leave.qr_token
          )}`
        );
      }

      fetchMyLeaves(token);
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to submit leave request");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/student-login");
  };

  const goHome = () => {
    navigate("/"); // Adjust route if homepage path is different
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex flex-col items-center p-8">
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8 text-white">
        <h1 className="text-4xl font-extrabold">Student Dashboard</h1>
        <div className="flex gap-3">
          <button
            onClick={goHome}
            className="bg-white text-purple-600 px-4 py-2 rounded shadow hover:bg-purple-600 hover:text-white transition-all"
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className="bg-white text-red-500 px-4 py-2 rounded shadow hover:bg-red-500 hover:text-white transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Layout: Table + Apply Leave Form */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
        {/* My Leaves */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-purple-700">My Leaves</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              {showForm ? "Close Form" : "Apply Leave"}
            </button>
          </div>

          {leaves.length > 0 ? (
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border p-2">From</th>
                  <th className="border p-2">To</th>
                  <th className="border p-2">Reason</th>
                  <th className="border p-2">Branch</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">QR Code</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id}>
                    <td className="border p-2">{leave.from_date}</td>
                    <td className="border p-2">{leave.to_date}</td>
                    <td className="border p-2">{leave.reason}</td>
                    <td className="border p-2">{leave.branch}</td>
                    <td className="border p-2 capitalize">{leave.status}</td>
                    <td className="border p-2">
                      {leave.status === "approved" && leave.qr_token ? (
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(
                            leave.qr_token
                          )}`}
                          alt="QR Code"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No leaves applied yet.</p>
          )}
        </div>

        {/* Apply Leave Form (Side Panel) */}
        {showForm && (
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-purple-700">Apply for Leave</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={student.name || ""}
                readOnly
                className="border-2 border-purple-300 p-3 rounded-xl bg-gray-100"
              />
              <input
                type="text"
                value={student.rollNo || ""}
                readOnly
                className="border-2 border-purple-300 p-3 rounded-xl bg-gray-100"
              />
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Branch"
                required
                className="border-2 border-purple-300 p-3 rounded-xl"
              />
              <input
                type="text"
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
                placeholder="Reason for leave"
                required
                className="border-2 border-purple-300 p-3 rounded-xl"
              />
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
                className="border-2 border-purple-300 p-3 rounded-xl"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
                className="border-2 border-purple-300 p-3 rounded-xl"
              />
              <button className="w-full bg-purple-500 text-white p-3 rounded-xl hover:bg-purple-700 font-bold">
                Submit Request
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Message */}
      {message && <p className="text-white font-semibold mt-6">{message}</p>}

      {/* QR Code */}
      {qrCode && (
        <div className="bg-white p-4 mt-6 rounded-2xl shadow-2xl">
          <h2 className="text-purple-700 font-bold mb-2">Your QR Code</h2>
          <img src={qrCode} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
