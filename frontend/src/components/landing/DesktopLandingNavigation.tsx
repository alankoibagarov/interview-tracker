import { Link } from "react-router-dom";
import type { User } from "../../services/authApi";
import GithubIcon from "../../assets/icons/GithubIcon";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

interface DesktopLandingNavigationProps {
    scrolled: boolean;
    user: User | null;
    logout: () => void;
}

const DesktopLandingNavigation: React.FC<DesktopLandingNavigationProps> = ({ scrolled, user, logout }) => {
    return (
    <nav
        className={`hidden md:block z-50 transition-colors duration-300 h-[70px] ${
          !scrolled &&
          "w-full flex fixed bg-white/0"
        }
      ${
        scrolled &&
        "w-full flex fixed bg-white/90 backdrop-blur-md border-b border-slate-300 shadow-lg"
      }  ${
          "bg-white backdrop-blur-md shadow-lg"
        }`}
      >
        <div className="w-full mx-auto px-5 flex justify-between items-center h-[70px]">
          <div className="flex items-center gap-2">
            <img className="size-[50px]" src="src/assets/logo.png" alt="Logo" />
            <Link
              to={"/"}
              className={`text-2xl font-bold hover:text-secondary-500 transition-colors duration-300 outline-none ${
                scrolled
                  ? "text-slate-950"
                  : "text-white"
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
                scrolled
                  ? "text-slate-900 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
              title="View on GitHub"
            >
                <GithubIcon />
            </a>
            {(
              <Link
                to="/interviews"
                className={`
                    px-4 py-2.5 rounded-lg font-medium transition-all 
                    duration-300 relative text-gray-700 
                    ${scrolled ? "text-primary-500 hover:text-white hover:bg-primary-500" : "text-white hover:text-primary-500 hover:bg-white"}`
                }
              >
                Dashboard
              </Link>
            )}

            {/* Auth buttons (fallback) */}
            {!user && (
              <Link
                to="/login"
                className={`
                    px-4 py-2.5 rounded-lg font-medium transition-all 
                    duration-300 relative text-gray-700 
                    ${scrolled ? "text-primary-500" : "text-white hover:text-primary-500 hover:bg-primary-50"}`
                }
              >
                Login
              </Link>
            )}

            {/* User Panel */}
            {user && (
              <>
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold overflow-hidden">
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
                      <span className={`text-sm font-medium ${scrolled ? "text-primary-500" : "text-white"}`}>
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
                    className={`h-6 w-6 cursor-pointer ${scrolled ? "text-primary-500" : "text-white"}`}
                    onClick={logout}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    )
}

export default DesktopLandingNavigation