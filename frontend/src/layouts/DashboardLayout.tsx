import { useState } from "react";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";
import { NavigationType } from "../const";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 h-screen">
      <Navigation type={NavigationType.DASHBOARD} />
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <main className="p-3 overflow-auto flex flex-1 bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
