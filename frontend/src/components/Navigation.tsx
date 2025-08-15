import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavigationType } from "../const";
import { useUserStore } from "../store/userStore";

type Props = {
  type?: NavigationType;
};

const Navigation: React.FC<Props> = ({ type }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  const user = useUserStore((state) => state.user);

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
    localStorage.removeItem("token");
    if (location.pathname !== "/") {
      navigate("/login");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || type === NavigationType.DASHBOARD
          ? "bg-white/95 backdrop-blur-md border-b border-white/20 shadow-lg"
          : "bg-white/0"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-5 flex justify-between items-center h-[70px]">
        <Link
          to="/"
          className={`text-2xl font-bold hover:text-secondary-500 transition-colors duration-300 ${
            scrolled || type === NavigationType.DASHBOARD
              ? "text-primary-500"
              : "text-white"
          }`}
        >
          Interview Tracker
        </Link>

        <div className="flex gap-8 items-center">
          <Link
            to="/dashboard"
            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-300 relative ${
              location.pathname === "/dashboard"
                ? 'text-primary-500 bg-primary-50 font-semibold after:content-[""] after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-primary-500 after:rounded-sm'
                : "text-gray-700 hover:text-primary-500 hover:bg-primary-50"
            } ${
              scrolled || type === NavigationType.DASHBOARD
                ? "text-primary-500"
                : "text-white"
            }`}
          >
            Dashboard
          </Link>
          {user ? (
            <button
              className={`px-4 py-2.5 rounded-lg font-medium transition-all 
              duration-300 relative text-gray-700 hover:text-primary-500 hover:bg-primary-50 cursor-pointer ${
                scrolled || type === NavigationType.DASHBOARD
                  ? "text-primary-500"
                  : "text-white"
              }`}
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-300 relative ${
                location.pathname === "/login"
                  ? 'text-primary-500 bg-primary-50 font-semibold after:content-[""] after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-primary-500 after:rounded-sm'
                  : "text-gray-700 hover:text-primary-500 hover:bg-primary-50"
              } ${
                scrolled || type === NavigationType.DASHBOARD
                  ? "text-primary-500"
                  : "text-white"
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
