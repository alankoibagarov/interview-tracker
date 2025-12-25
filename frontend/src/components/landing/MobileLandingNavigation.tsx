import { useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "../../services/authApi";
import GithubIcon from "../../assets/icons/GithubIcon";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import HamburgerIcon from "./HamburgerIcon";

interface MobileLandingNavigationProps {
    scrolled: boolean;
    user: User | null;
    logout: () => void;
}

const MobileLandingNavigation: React.FC<MobileLandingNavigationProps> = ({ scrolled, user, logout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        closeMenu();
        logout();
    };

    return (
        <>
            <nav
                className={`block md:hidden z-50 transition-colors duration-300 h-[50px] ${
                  !scrolled &&
                  "w-full flex fixed bg-white/0"
                }
              ${
                scrolled &&
                "w-full flex fixed bg-white/90 backdrop-blur-md shadow-lg"
              }  ${
                  "bg-white backdrop-blur-md shadow-lg"
                }`}
            >
                <div className="w-full mx-auto px-1 flex justify-between items-center h-[50px]">
                    <div className="flex items-center gap-2">
                        <img className="size-[40px]" src="src/assets/logo.png" alt="Logo" />
                        <Link
                            to={"/"}
                            className={`text-lg font-bold hover:text-secondary-500 transition-colors duration-300 outline-none ${
                                scrolled
                                    ? "text-slate-950"
                                    : "text-white"
                            }`}
                        >
                            Interview Flow
                        </Link>
                    </div>
                    <div className="flex gap-2 items-center">
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
                        
                        {/* Burger Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className={`p-2 rounded-full transition-colors duration-300 ${ scrolled
                                    ? "text-slate-900 hover:bg-slate-100"
                                    : "text-white hover:bg-white/10"
                            }`}
                            aria-label="Toggle menu"
                        >

                            <HamburgerIcon scrolled={scrolled} isMenuOpen={isMenuOpen} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Backdrop Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 top-[50px] bg-black/50 z-50 md:hidden transition-opacity duration-300"
                    onClick={closeMenu}
                />
            )}

            {/* Slide-out Menu */}
            <div
                className={`fixed top-[50px] right-0 h-full w-[100vw] bg-white/90 backdrop-blur-md shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Menu Header */}
                    <div className="flex items-center justify-center p-4 border-b border-slate-400">
                        <h2 className="text-lg font-bold text-slate-950 text-center">Menu</h2>
                    </div>

                    {/* Menu Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {/* User Panel */}
                        {user && (
                            <div className="border-t border-slate-200">
                                <div className="">
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                                        <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold overflow-hidden flex-shrink-0">
                                            {user.profilePicture ? (
                                                <img
                                                    src={`${import.meta.env.VITE_API_LINK}${user.profilePicture}`}
                                                    alt={user.username}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                user.username?.charAt(0).toUpperCase() || "U"
                                            )}
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-sm font-semibold text-slate-900 truncate">
                                                {user.username || "User"}
                                            </span>
                                            <span className="text-xs text-slate-500 truncate">
                                                {user.email || user.username || ""}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Links */}
                        <div className="space-y-2">
                            <Link
                                to="/interviews"
                                onClick={closeMenu}
                                className="block px-4 py-3 rounded-lg text-slate-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                            
                            {!user && (
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="block px-4 py-3 rounded-lg text-slate-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition-colors duration-200"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* User Panel */}
                        {user && (
                            <div className="border-t border-slate-200">                                
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors duration-200"
                                >
                                    <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MobileLandingNavigation;