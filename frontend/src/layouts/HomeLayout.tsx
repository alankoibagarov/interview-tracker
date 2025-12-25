import LandingNavigation from "../components/landing/LandingNavigation";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <LandingNavigation />
      <main>{children}</main>
    </div>
  );
};
export default HomeLayout;
