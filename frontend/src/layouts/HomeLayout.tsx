import Navigation from "../components/Navigation";
import { NavigationType } from "../const";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation type={NavigationType.HOME} />
      <main>{children}</main>
    </div>
  );
};
export default HomeLayout;
