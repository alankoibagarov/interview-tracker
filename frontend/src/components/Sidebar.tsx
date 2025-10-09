import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const [activeItem, setActiveItem] = useState(location.pathname);

  const sidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
      path: "/dashboard",
    },
    {
      id: "interviews",
      label: "Interviews",
      icon: "💼",
      path: "/interviews",
    },
    // {
    //   id: "calendar",
    //   label: "Calendar",
    //   icon: "📅",
    //   path: "/calendar",
    // },
    // {
    //   id: "companies",
    //   label: "Companies",
    //   icon: "🏢",
    //   path: "/companies",
    // },
    // {
    //   id: "analytics",
    //   label: "Analytics",
    //   icon: "📈",
    //   path: "/analytics",
    // },
    // {
    //   id: "settings",
    //   label: "Settings",
    //   icon: "⚙️",
    //   path: "/settings",
    // },
  ];

  const handleItemClick = (path: string) => {
    setActiveItem(path);
    onClose(); // Close sidebar on mobile after navigation
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`h-[calc(100vh-71px)] w-20 bg-slate-950 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:shadow-none lg:border-r lg:border-slate-950`}
      >
        {/* Navigation Items */}
        <nav className="flex-1 pt-4">
          <ul className="space-y-0">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  onClick={() => handleItemClick(item.path)}
                  className={`flex flex-col items-center justify-between text-xs px-2 py-2 rounded-lg transition-all duration-200 group ${
                    activeItem === item.path
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center space-x-3 rounded-sm w-8 h-8 mb-1 ${
                      activeItem === item.path && "bg-yellow-500"
                    }`}
                  >
                    <span className="text-xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
