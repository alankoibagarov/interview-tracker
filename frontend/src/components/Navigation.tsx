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
import { useConfirm } from "./ConfirmModal";

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
  const { confirm } = useConfirm();

  const logout = async () => {
    const confirmed = await confirm({
      title: "Confirm Logout",
      message: "Are you sure you want to logout?",
      confirmText: "Logout",
      cancelText: "Cancel",
      variant: "warning",
    });

    if (!confirmed) return;

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
            <a
              href="https://github.com/alankoibagarov/interview-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors duration-300 ${
                scrolled || type === NavigationType.DASHBOARD
                  ? "text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  : "text-white hover:bg-white/10"
              }`}
              title="View on GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
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
                    <div className="w-9 h-9 bg-primary-500 rounded-full flex items-center justify-center text-slate-900 dark:text-white font-semibold overflow-hidden border border-slate-200 dark:border-slate-700">
                      {user.profilePicture ? (
                        <img
                          src={`${process.env.VITE_API_LINK}${user.profilePicture}`}
                          alt={user.username}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user.username?.charAt(0).toUpperCase() || "U"
                      )}
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
