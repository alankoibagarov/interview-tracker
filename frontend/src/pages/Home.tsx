import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

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
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-5 py-20 min-h-[90vh]">
        <div className="flex-1 text-white max-w-2xl mb-12 lg:mb-0">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl text-white-700 font-bold mb-6 leading-tight">
              Interview Flow
            </h1>
            <p className="text-lg lg:text-2xl mb-8 opacity-90 text-white-700 leading-relaxed font-light">
              Master your interview process with intelligent tracking,
              <span className="font-semibold text-yellow-300">
                {" "}
                data-driven insights
              </span>
              , and
              <span className="font-semibold text-yellow-300">
                {" "}
                proven strategies
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-12">
              <Link
                to="/dashboard"
                className="btn-primary group bg-primary-500 hover:bg-primary-600 text-white-700 px-6 py-3 rounded-lg"
              >
                <span className="flex text-white-700 items-center justify-center gap-2">
                  Get Started
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
                </span>
              </Link>
              <button className="btn-secondary group text-white-700">
                <span className="flex items-center justify-center gap-2">
                  Watch Demo
                  <svg
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 text-white/80 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-yellow-300">
                  10K+
                </div>
                <div className="text-sm">Interviews Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-yellow-300">
                  85%
                </div>
                <div className="text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-yellow-300">
                  24/7
                </div>
                <div className="text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-4xl w-full text-white">
            <div className="feature-card text-center">
              <div className="text-4xl lg:text-5xl mb-4">📊</div>
              <h3 className="text-lg lg:text-xl mb-3  font-semibold">
                Smart Analytics
              </h3>
              <p className="text-sm opacity-90 leading-relaxed">
                AI-powered insights to improve your interview performance
              </p>
            </div>
            <div className="feature-card text-center">
              <div className="text-4xl lg:text-5xl mb-4">📅</div>
              <h3 className="text-lg lg:text-xl mb-3 font-semibold">
                Smart Scheduling
              </h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Intelligent calendar management with reminders
              </p>
            </div>
            <div className="feature-card text-center">
              <div className="text-4xl lg:text-5xl mb-4">📝</div>
              <h3 className="text-lg lg:text-xl mb-3 font-semibold">
                Smart Notes
              </h3>
              <p className="text-sm opacity-90 leading-relaxed">
                AI-enhanced note-taking with action items
              </p>
            </div>
            <div className="feature-card text-center">
              <div className="text-4xl lg:text-5xl mb-4">🎯</div>
              <h3 className="text-lg lg:text-xl mb-3 font-semibold">
                Goal Tracking
              </h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Set and achieve your career milestones
              </p>
            </div>
            <div className="feature-card text-center">
              <div className="text-4xl lg:text-5xl mb-4">🚀</div>
              <h3 className="text-lg lg:text-xl mb-3 font-semibold">
                Performance Boost
              </h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Proven strategies to ace every interview
              </p>
            </div>
            <div className="feature-card text-center">
              <div className="text-4xl lg:text-5xl mb-4">🔒</div>
              <h3 className="text-lg lg:text-xl mb-3 font-semibold">
                Secure & Private
              </h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Enterprise-grade security for your data
              </p>
            </div>
          </div>
        </div>
      </div>

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
