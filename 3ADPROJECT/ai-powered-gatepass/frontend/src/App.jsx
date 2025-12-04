import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import NavbarLogin from "./components/NavbarLogin.jsx";
import RegistrationForm from "./components/RegistrationForm.jsx";

// Pages
import Home from "./pages/Home.jsx";
import StudentLogin from "./pages/StudentLogin.jsx";
import StudentRegister from "./pages/StudentRegister.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import FacultyLogin from "./pages/FacultyLogin.jsx";
import FacultyRegister from "./pages/FacultyRegister.jsx";
import FacultyDashboard from "./pages/FacultyDashboard.jsx";
import GatekeeperLogin from "./pages/GatekeeperLogin.jsx";
import GatekeeperDashboard from "./pages/GatekeeperDashboard.jsx";
import QRScanner from "./pages/QRScannerPage.jsx";
import GatekeeperRegister from "./pages/GatekeeperRegister.jsx";

function App() {
  return (
    <Router>
      <NavbarLogin />
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
        <Route path="/qr-scanner" element={<QRScanner />} />

        {/* Optional Registration Form */}
        <Route path="/registration-form" element={<RegistrationForm />} />

        {/* Fallback route for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
