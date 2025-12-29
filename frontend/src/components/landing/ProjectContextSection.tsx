import React from "react";
import {
  GlobeAltIcon,
  CodeBracketIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const ProjectContextSection: React.FC = () => {
  const techStack = [
    { category: "Frontend", items: ["React 19", "Vite", "TypeScript", "Tailwind CSS", "Zustand"] },
    { category: "Backend", items: ["NestJS", "TypeORM", "PostgreSQL", "JWT"] },
    { category: "Testing", items: ["Jest", "Vitest", "React Testing Library"] },
  ];

  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden border-t border-slate-800/50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent opacity-50"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-md font-bold tracking-widest text-primary-400 uppercase mb-8">
            Project Context
          </h2>
          <p className="max-w-4xl mx-auto text-xl md:text-2xl text-slate-300 leading-relaxed font-light mb-12">
            This application was built as a <span className="text-white font-medium">non-profit SaaS-style project</span> to demonstrate product thinking, frontend architecture, and backend fundamentals. It focuses on solving a real problem with minimal surface area rather than feature bloat.
          </p>

          <h3 className="text-sm font-bold tracking-widest text-primary-400 uppercase mb-8">
            Tech Stack
          </h3>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {techStack.map((tech, index) => (
            <div key={index} className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50 backdrop-blur-sm">
              <h3 className="text-primary-400 font-bold mb-4 uppercase tracking-wider text-xs">
                {tech.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tech.items.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className="px-3 py-1 text-sm bg-slate-800/50 text-slate-300 rounded-full border border-slate-700/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <a
            href="https://github.com/alankoibagarov/interview-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-primary-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <CodeBracketIcon className="w-6 h-6 text-primary-400" />
            </div>
            <span className="text-slate-400 font-medium group-hover:text-white transition-colors">
              GitHub Repo
            </span>
          </a>

          <a
            href="https://github.com/alankoibagarov"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-primary-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <UserIcon className="w-6 h-6 text-primary-400" />
            </div>
            <span className="text-slate-400 font-medium group-hover:text-white transition-colors">
              Creator's GitHub
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectContextSection;
