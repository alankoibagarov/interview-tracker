import React, { useState, useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { UserIcon } from "@heroicons/react/24/outline";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

enum SettingsTab {
  PROFILE = "Profile",
}

const SettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>(SettingsTab.PROFILE);
  const user = useUserStore((state) => state.user);
  
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to allow render before adding active class for transition
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 300); // 300ms matches duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl h-[600px] flex overflow-hidden border border-slate-200 dark:border-slate-700 relative z-10 transition-all duration-300 transform ${isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
      >
        {/* Left Side Menu */}
        <div className="w-1/4 min-w-[200px] bg-slate-50 dark:bg-slate-950/50 border-r border-slate-200 dark:border-slate-800 p-4">
          <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white px-2">
            Settings
          </h2>
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab(SettingsTab.PROFILE)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                activeTab === SettingsTab.PROFILE
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              <UserIcon className="size-5" />
              <span className="font-medium">Profile</span>
            </button>
          </nav>
        </div>

        {/* Right Side Content */}
        <div className="flex-1 p-8 overflow-y-auto relative">
            <button 
                onClick={onClose}
                aria-label="Close settings"
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

          {activeTab === SettingsTab.PROFILE && (
            <div className="max-w-xl animate-fadeIn">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                My Profile
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <div className="size-20 bg-primary-500 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg shadow-primary-500/20">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                      {user?.username}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400">
                      {user?.role} Account
                    </p>
                  </div>
                </div>

                <div className="grid gap-6">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Username
                    </label>
                    <div className="text-lg font-medium text-slate-900 dark:text-white">
                      {user?.username}
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Email Address
                    </label>
                    <div className="text-lg font-medium text-slate-900 dark:text-white">
                      {user?.email}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                        Role
                    </label>
                    <div className="text-lg font-medium text-slate-900 dark:text-white capitalize">
                        {user?.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
