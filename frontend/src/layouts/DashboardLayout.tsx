import Navigation from "../components/Navigation";
import { NavigationType } from "../const";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation type={NavigationType.DASHBOARD} />
      <main className="pt-[70px]">{children}</main>
    </div>
  );
};
export default DashboardLayout;
