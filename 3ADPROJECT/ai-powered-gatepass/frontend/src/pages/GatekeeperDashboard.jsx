import React, { useEffect, useState, useCallback } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import QRScanner from "../components/QRScanner";

function GatekeeperDashboard() {
  const [scans, setScans] = useState([]);
  const [scanResult, setScanResult] = useState(null);
  const [openScanner, setOpenScanner] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchScans = useCallback(async () => {
    try {
      const res = await api.get("/api/gatekeeper/scans");
      setScans(res.data.logs || []);
    } catch {
      setMessage("⚠️ Failed to load scans");
    }
  }, []);

  useEffect(() => {
    if (!token) navigate("/gatekeeper-login");
    else fetchScans();
  }, [token, navigate, fetchScans]);

  const handleScan = async (qrText) => {
    if (!qrText) return;
    try {
      const res = await api.post("/api/gatekeeper/scan", { qr_token: qrText });
      setScanResult(res.data);
      setMessage("✅ Scan successful");
      fetchScans();
    } catch {
      setMessage("❌ Invalid or expired QR code");
      setScanResult(null);
    } finally {
      setOpenScanner(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/gatekeeper-login");
  };
  const goHome = () => {
    navigate("/"); // Adjust route if homepage path is different
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Gatekeeper Dashboard</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setOpenScanner(!openScanner)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {openScanner ? "Close Scanner" : "Open Scanner"}
            </button>
            <button
              onClick={goHome}
              className="bg-white text-purple-600 px-4 py-2 rounded shadow hover:bg-purple-600 hover:text-white transition-all"
            >
              Home
            </button>
            <button
              onClick={fetchScans}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {message && (
          <p className="mb-4 text-center font-medium text-indigo-700">{message}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Scanner Card */}
          <div className="col-span-1 bg-gray-50 rounded-xl p-4 shadow-inner">
            <h3 className="font-semibold text-lg mb-3 text-gray-700">QR Scanner</h3>
            {openScanner ? (
              <QRScanner
                onScan={(data) => data && handleScan(data)}
                onError={(err) => setMessage(err?.message || "Camera error")}
              />
            ) : (
              <p className="text-gray-600 text-sm">Click “Open Scanner” to start scanning.</p>
            )}

            {scanResult && (
              <div className="mt-4 p-3 bg-white border rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-1">Last Scan</h4>
                <p><strong>Student:</strong> {scanResult.student?.name}</p>
                <p><strong>Roll:</strong> {scanResult.student?.rollNo}</p>
                <p><strong>Leave:</strong> {scanResult.leave?.from_date} → {scanResult.leave?.to_date}</p>
                <p><strong>Status:</strong> {scanResult.leave?.status}</p>
              </div>
            )}
          </div>

          {/* Scans List */}
          <div className="col-span-2 bg-gray-50 rounded-xl p-4 shadow-inner overflow-x-auto">
            <h3 className="font-semibold text-lg mb-3 text-gray-700">Recent Scans</h3>
            {scans.length === 0 ? (
              <p className="text-gray-600">No scans yet.</p>
            ) : (
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="text-left p-2">Time</th>
                    <th className="text-left p-2">Student</th>
                    <th className="text-left p-2">Roll</th>
                    <th className="text-left p-2">Leave Dates</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {scans.map((s, i) => (
                    <tr key={i} className="border-t hover:bg-gray-100">
                      <td className="p-2">{new Date(s.scanned_at).toLocaleString()}</td>
                      <td className="p-2">{s.user?.name}</td>
                      <td className="p-2">{s.user?.rollNo}</td>
                      <td className="p-2">{s.leave?.from_date} — {s.leave?.to_date}</td>
                      <td className="p-2">{s.leave?.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GatekeeperDashboard;
