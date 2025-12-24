import React, { useState, useEffect, useRef } from "react";
import { useUserStore } from "../store/userStore";
import { UserIcon } from "@heroicons/react/24/outline";
import { authService } from "../services/authApi";
import toast from 'react-hot-toast';
import { useConfirm } from "./ConfirmModal";

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
  const setUser = useUserStore((state) => state.setUser);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { confirm } = useConfirm();
  
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      try {
        const response = await authService.uploadProfilePicture(file);
        if (response.statusCode === 200) {
          setUser({ ...user, profilePicture: response.profilePicture });
          toast.success("Profile picture updated successfully");
        }
      } catch (error) {
        console.error("Failed to upload profile picture", error);
        toast.error("Failed to upload profile picture");
      }
    }
  };

  const handleDeleteProfilePicture = async () => {
    if (user) {
      const confirmed = await confirm({
        title: "Remove Profile Picture",
        message: "Are you sure you want to remove your profile picture?",
        confirmText: "Remove",
        cancelText: "Cancel",
        variant: "danger",
      });
      
      if (!confirmed) return;

      try {
        const response = await authService.deleteProfilePicture();
        if (response.statusCode === 200) {
           setUser({ ...user, profilePicture: null });
           toast.success("Profile picture removed successfully");
        }
      } catch (error) {
        console.error("Failed to delete profile picture", error);
        toast.error("Failed to delete profile picture");
      }
    }
  };

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
                  <div className="relative group">
                    <div className="size-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-lg shadow-slate-200 dark:shadow-none">
                       {user?.profilePicture ? (
                            <img 
                                src={`${process.env.VITE_API_LINK}${user.profilePicture}`} 
                                alt={user.username}
                                className="w-full h-full object-cover"
                            />
                       ) : (
                        <div className="w-full h-full bg-primary-500 text-white flex items-center justify-center text-4xl font-bold">
                            {user?.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                       )}
                    </div>
                     <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept="image/*"
                     />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                      {user?.username}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 mb-4">
                      {user?.role} Account
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors"
                        >
                            Change Photo
                        </button>
                        {user?.profilePicture && (
                             <button
                                onClick={handleDeleteProfilePicture}
                                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                                Remove
                            </button>
                        )}
                    </div>
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
