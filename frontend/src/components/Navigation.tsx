import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-white/20 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="w-full max-w-7xl mx-auto px-5 flex justify-between items-center h-[70px]">
        <Link
          to="/"
          className="text-2xl font-bold text-primary-500 hover:text-secondary-500 transition-colors duration-300"
        >
          Interview Tracker
        </Link>

        <div className="flex gap-8 items-center">
          <Link
            to="/"
            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-300 relative ${
              location.pathname === "/"
                ? 'text-primary-500 bg-primary-50 font-semibold after:content-[""] after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-primary-500 after:rounded-sm'
                : "text-gray-700 hover:text-primary-500 hover:bg-primary-50"
            }`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-300 relative ${
              location.pathname === "/dashboard"
                ? 'text-primary-500 bg-primary-50 font-semibold after:content-[""] after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-primary-500 after:rounded-sm'
                : "text-gray-700 hover:text-primary-500 hover:bg-primary-50"
            }`}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
