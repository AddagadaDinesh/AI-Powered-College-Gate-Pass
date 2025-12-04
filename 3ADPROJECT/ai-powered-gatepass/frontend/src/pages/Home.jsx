import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white">
      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-bounce">
        AI Powered Gatepass System
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-2xl mb-10 text-center max-w-2xl animate-fadeIn">
        Manage student gatepasses efficiently with AI — secure, fast, and
        reliable system for students, faculty, and gatekeepers.
      </p>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Student */}
        <Link
          to="/student-register"
          className="bg-white text-blue-600 shadow-lg rounded-2xl p-6 text-center transform transition duration-500 hover:scale-110 hover:bg-blue-100"
        >
          <h2 className="text-2xl font-bold mb-2">Student</h2>
          <p className="text-gray-700">Register & apply for gatepass</p>
        </Link>

        {/* Faculty */}
        <Link
          to="/faculty-login"
          className="bg-white text-green-600 shadow-lg rounded-2xl p-6 text-center transform transition duration-500 hover:scale-110 hover:bg-green-100"
        >
          <h2 className="text-2xl font-bold mb-2">Faculty</h2>
          <p className="text-gray-700">Approve or reject gatepass requests</p>
        </Link>

        {/* Gatekeeper */}
        <Link
          to="/gatekeeper-login"
          className="bg-white text-purple-600 shadow-lg rounded-2xl p-6 text-center transform transition duration-500 hover:scale-110 hover:bg-purple-100"
        >
          <h2 className="text-2xl font-bold mb-2">Gatekeeper</h2>
          <p className="text-gray-700">Verify gatepasses with QR codes</p>
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-sm opacity-75">
        © {new Date().getFullYear()} AI Powered Gatepass | All Rights Reserved
      </footer>
    </div>
  );
}

export default Home;
