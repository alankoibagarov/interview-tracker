import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ListBulletIcon,
  // CalendarDaysIcon,
} from "@heroicons/react/24/solid";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface SidebarItem {
  id: string;
  label: string;
  icon: IconType;
  path: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const [activeItem, setActiveItem] = useState(location.pathname);

  const sidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: HomeIcon,
      path: "/dashboard",
    },
    {
      id: "interviews",
      label: "Interviews",
      icon: ListBulletIcon,
      path: "/interviews",
    },
    // {
    //   id: "calendar",
    //   label: "Calendar",
    //   icon: CalendarDaysIcon,
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
        className={`hidden md:block h-[calc(100vh-70px)] w-20 bg-white dark:bg-slate-950 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:shadow-none`}
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
                    className={`flex items-center justify-center space-x-3 rounded-sm w-8 h-8 mb-1 text-slate-900 dark:text-white ${
                      activeItem === item.path && "bg-yellow-500"
                    }`}
                  >
                    <span className="text-xl">
                      <item.icon className="size-6" />
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-slate-900 dark:text-white">
                      {item.label}
                    </span>
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
