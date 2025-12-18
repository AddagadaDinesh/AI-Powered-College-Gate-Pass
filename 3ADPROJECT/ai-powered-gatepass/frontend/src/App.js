import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import NavbarLogin from "./components/NavbarLogin";
import RegistrationForm from "./components/RegistrationForm";

// Pages
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import StudentRegister from "./pages/StudentRegister";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyLogin from "./pages/FacultyLogin";
import FacultyRegister from "./pages/FacultyRegister";
import FacultyDashboard from "./pages/FacultyDashboard";
import GatekeeperLogin from "./pages/GatekeeperLogin";
import GatekeeperRegister from "./pages/GatekeeperRegister";
import GatekeeperDashboard from "./pages/GatekeeperDashboard";
import QRScannerPage from "./pages/QRScannerPage"; // ✅ renamed

function App() {
  return (
    <Router>
      {/* Navbar */}
      <NavbarLogin title="AI Powered Gate Pass" />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Student Routes */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* Faculty Routes */}
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/faculty-register" element={<FacultyRegister />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />

        {/* Gatekeeper Routes */}
        <Route path="/gatekeeper-login" element={<GatekeeperLogin />} />
        <Route path="/gatekeeper-register" element={<GatekeeperRegister />} />
        <Route path="/gatekeeper-dashboard" element={<GatekeeperDashboard />} />
        <Route path="/qr-scanner" element={<QRScannerPage />} />

        {/* Optional Registration Form */}
        <Route path="/registration-form" element={<RegistrationForm />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;