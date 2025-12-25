import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HeroSection from "../components/landing/HeroSection";

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


      {/* Features Section */}
      <div className="relative bg-white py-16 lg:py-24 w-full">
        <div className="w-full max-w-7xl mx-auto px-5">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4 lg:mb-6">
              Why Choose Interview Flow?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who have transformed their
              interview success with our comprehensive tracking and analytics
              platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center p-6 lg:p-8 group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300">
                <span className="text-2xl lg:text-3xl">📈</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3 lg:mb-4">
                Advanced Analytics
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Get deep insights into your interview performance with detailed
                analytics, progress tracking, and personalized recommendations.
              </p>
            </div>

            <div className="text-center p-6 lg:p-8 group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300">
                <span className="text-2xl lg:text-3xl">🎯</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3 lg:mb-4">
                Smart Goal Setting
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Set and track your career goals with our intelligent goal
                management system that adapts to your progress and provides
                actionable insights.
              </p>
            </div>

            <div className="text-center p-6 lg:p-8 group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300">
                <span className="text-2xl lg:text-3xl">📱</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3 lg:mb-4">
                Mobile First
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Access your interview data anywhere, anytime with our responsive
                design that works perfectly on desktop, tablet, and mobile
                devices.
              </p>
            </div>

            <div className="text-center p-6 lg:p-8 group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300">
                <span className="text-2xl lg:text-3xl">🔒</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3 lg:mb-4">
                Enterprise Security
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Your data is protected with enterprise-grade security,
                encryption, and privacy controls that meet the highest industry
                standards.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 lg:mt-16">
            <div className="bg-gradient-to-r from-primary-600 to-indigo-900 rounded-3xl p-8 lg:p-12 text-white">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Transform Your Interview Success?
              </h3>
              <p className="text-lg lg:text-xl opacity-90 mb-6 lg:mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have already improved their
                interview performance with our comprehensive tracking platform.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-3 bg-white text-primary-500 px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold text-base lg:text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/30"
              >
                Start Your Free Trial
                <svg
                  className="w-4 h-4 lg:w-5 lg:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
