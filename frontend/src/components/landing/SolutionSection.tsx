import React from "react";
import {
  Squares2X2Icon,
  ArrowPathIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const SolutionSection: React.FC = () => {
  const solutions = [
    {
      title: "Centralized tracking",
      description: "All interviews in one focused dashboard. No more hunting through emails or scattered notes.",
      icon: <Squares2X2Icon className="w-8 h-8 text-primary-400" />,
      gradient: "from-slate-800 to-slate-900",
    },
    {
      title: "Reflection-driven improvement",
      description: "Capture what worked and what didn’t. Turn every interview into a lesson for the next one.",
      icon: <ArrowPathIcon className="w-8 h-8 text-primary-400" />,
      gradient: "from-slate-800 to-slate-900",
    },
    {
      title: "Clear progress signals",
      description: "See trends instead of guessing. Track your journey with data-driven insights and visual feedback.",
      icon: <ChartBarIcon className="w-8 h-8 text-primary-400" />,
      gradient: "from-slate-800 to-slate-900",
    },
  ];

  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden min-h-[80dvh] border-t border-slate-800/50">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-primary-900/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/40 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-5">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-primary-400 uppercase mb-4">
            The Solution
          </h2>
          <h3 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Built for growth, not just tracking
          </h3>
          <p className="text-lg text-slate-400 leading-relaxed">
            Stop tracking blindly. This application will help you to track your interviews and provide insights to improve your performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl bg-gradient-to-br ${solution.gradient} border border-slate-800 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 group`}
            >
              <div className="flex flex-col gap-6 items-center">
                <div className="shrink-0 w-24 h-24 md:w-16 md:h-16 bg-slate-950 rounded-2xl flex items-center justify-center shadow-inner border border-slate-800 group-hover:scale-110 transition-transform duration-500 group-hover:border-primary-500/50">
                  {solution.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                    {solution.title}
                  </h4>
                  <p className="text-slate-400 leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
