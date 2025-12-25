
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.png";

const HeroSection = () => {
    return (
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl mx-auto px-5 py-20 min-h-[100dvh]">

        {/* Left Side */}
        <div className="grid items-center text-white max-w-2xl">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl text-white-700 font-bold mb-6 leading-tight">
              Track interviews. Learn from each one. Improve systematically.
            </h1>
            <p className="text-lg lg:text-2xl mb-8 opacity-90 text-white-700 leading-relaxed font-light">
              A minimal interview tracking dashboard built to reduce chaos and help job seekers improve — without noise or bloat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-8">
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
            </div>

            <div className="max-w-md">
                <span>This is an open source project, build for the community, feel free to check it out on </span>               
                <Link to="https://github.com/alankoibagarov/interview-tracker" target="_blank" className="text-white-700 underline hover:text-white-800 transition-colors">GitHub</Link>.
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="items-center hidden md:grid">
            <img src={heroImage} className="absolute h-auto object-cover transition delay-150 duration-300 ease-in-out hover:-translate-x-[50%] hover:scale-105" alt="Hero Image" />
        </div>
      </div>
    );
};

export default HeroSection;