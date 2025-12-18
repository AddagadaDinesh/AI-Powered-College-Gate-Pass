import React from "react";
import { Link } from "react-router-dom";

const NavbarLogin = ({ title }) => {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">{title}</h1>

      <div className="space-x-4">
        <Link to="/student-login" className="hover:underline">
          Student
        </Link>
        <Link to="/faculty-login" className="hover:underline">
          Faculty
        </Link>
        <Link to="/gatekeeper-login" className="hover:underline">
          Gatekeeper
        </Link>
      </div>
    </div>
  );
};

export default NavbarLogin;
