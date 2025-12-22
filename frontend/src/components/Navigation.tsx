import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavigationType } from "../const";
import { useUserStore } from "../store/userStore";
import {
  Cog6ToothIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { authService } from "../services/authApi";
import SettingsModal from "./SettingsModal";

type Props = {
  type?: NavigationType;
};

const Navigation: React.FC<Props> = ({ type }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
    localStorage.removeItem("access_token");
    setUser(null);
    if (location.pathname !== "/") {
      navigate("/login");
    }
  };

  const switchTheme = async () => {
    if (user) {
      const res = await authService.setTheme(
        user.username,
        !user.themeDarkMode
      );
      if (res.statusCode === 200) {
        await setUser({ ...user, themeDarkMode: !user.themeDarkMode });
      }
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
    <>
      <nav
        className={`z-50 transition-colors duration-300 h-[70px] ${
          type === NavigationType.HOME &&
          !scrolled &&
          "w-full flex fixed bg-white/0"
        }
      ${
        scrolled &&
        "w-full flex fixed bg-white/90 backdrop-blur-md border-b border-slate-300 dark:border-white/20 shadow-lg"
      }  ${
          type === NavigationType.DASHBOARD &&
          "bg-white dark:bg-slate-950 backdrop-blur-md border-b border-slate-300 dark:border-white/20 shadow-lg"
        }`}
      >
        <div className="w-full mx-auto px-5 flex justify-between items-center h-[70px]">
          <div className="flex items-center gap-2">
            <img className="size-[50px]" src="src/assets/logo.png" alt="Logo" />
            <Link
              to={type === NavigationType.HOME ? "/" : "/interviews"}
              className={`text-2xl font-bold hover:text-secondary-500 transition-colors duration-300 outline-none ${
                scrolled
                  ? "text-white dark:text-slate-950"
                  : "text-slate-950 dark:text-white"
              }`}
            >
              Interview Flow
            </Link>
          </div>
          <div className="flex gap-3 items-center">
            {type !== NavigationType.DASHBOARD && (
              <Link
                to="/interviews"
                className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-300 relative ${
                  location.pathname === "/interviews"
                    ? 'text-primary-500 bg-primary-50 font-semibold after:content-[""] after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-primary-500 after:rounded-sm'
                    : "text-gray-700 hover:text-primary-500 hover:bg-primary-50"
                } ${scrolled ? "text-primary-500" : "text-white"}`}
              >
                Dashboard
              </Link>
            )}

            {/* Auth buttons (fallback) */}
            {!user && (
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

            {/* User Panel */}
            {user && (
              <>
                <div className="flex gap-3">
                  {user.themeDarkMode ? (
                    <MoonIcon
                      title="Switch to Light Mode"
                      className="h-6 w-6 text-slate-900 dark:text-white cursor-pointer"
                      onClick={switchTheme}
                    />
                  ) : (
                    <SunIcon
                      title="Switch to Dark Mode"
                      className="h-6 w-6 text-slate-900 dark:text-white cursor-pointer"
                      onClick={switchTheme}
                    />
                  )}
                  <Cog6ToothIcon
                    title="Settings"
                    className="h-6 w-6 text-slate-900 dark:text-white cursor-pointer"
                    onClick={() => setIsSettingsOpen(true)}
                  />
                  <UserIcon
                    title="Profile"
                    className="h-6 w-6 text-slate-900 dark:text-white cursor-pointer"
                  />
                </div>
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary-500 rounded-full flex items-center justify-center text-slate-900 dark:text-white font-semibold">
                      {user.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="hidden sm:flex flex-col items-start">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {user.username || "User"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {user.username || ""}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ArrowRightStartOnRectangleIcon
                    title="Logout"
                    className="h-6 w-6 text-slate-900 dark:text-white cursor-pointer"
                    onClick={logout}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};

export default Navigation;
