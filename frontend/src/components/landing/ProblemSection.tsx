import React from "react";
import {
  DocumentDuplicateIcon,
  NoSymbolIcon,
  ScaleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const ProblemSection: React.FC = () => {
  const problems = [
    {
      title: "Scattered Prep",
      description: "Interview prep lives in scattered notes, docs, and calendar invites. Finding what you need is a journey in itself.",
      icon: <DocumentDuplicateIcon className="w-8 h-8 text-primary-500" />,
      gradient: "from-blue-50 to-indigo-50",
    },
    {
      title: "Forgotten Lessons",
      description: "Past interviews are forgotten instead of learned from. The same hard questions keep catching you off guard.",
      icon: <NoSymbolIcon className="w-8 h-8 text-primary-500" />,
      gradient: "from-slate-50 to-blue-50",
    },
    {
      title: "Subjective Progress",
      description: "Progress is judged emotionally—how you felt—rather than objectively through data and consistent tracking.",
      icon: <ScaleIcon className="w-8 h-8 text-primary-500" />,
      gradient: "from-indigo-50 to-slate-50",
    },
    {
      title: "Repeating Patterns",
      description: "Mistakes repeat because you aren't tracking where you stumble. Growth happens when you see the patterns.",
      icon: <ArrowPathIcon className="w-8 h-8 text-primary-500" />,
      gradient: "from-blue-50 to-slate-50",
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden min-h-[100dvh]">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-5">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-4">
            The Reality Check
          </h2>
          <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Why tracking interviews is usually a mess
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Most job seekers rely on memory and sheer willpower. But without a system, 
            every interview starts from zero. Here's the truth:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl bg-gradient-to-br ${problem.gradient} border border-slate-100/50 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-500 group`}
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="shrink-0 w-24 h-24 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                  {problem.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {problem.title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {problem.description}
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

export default ProblemSection;
