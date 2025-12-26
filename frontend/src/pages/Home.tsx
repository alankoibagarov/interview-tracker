import React from "react";
import Footer from "../components/Footer";
import HeroSection from "../components/landing/HeroSection";
import ProblemSection from "../components/landing/ProblemSection";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 w-full overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden bg-slate-950">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Problem Section */}
      <ProblemSection />

      <Footer />
    </div>
  );
};

export default Home;
