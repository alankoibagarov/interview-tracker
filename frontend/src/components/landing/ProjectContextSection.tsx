import React from "react";

const ProjectContextSection: React.FC = () => {
  const techStack = [
    { category: "Frontend", items: ["React 19", "Vite", "TypeScript", "Tailwind CSS", "Zustand"] },
    { category: "Backend", items: ["NestJS", "TypeORM", "PostgreSQL", "JWT"] },
    { category: "Testing", items: ["Jest", "Vitest", "React Testing Library"] },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden border-t border-slate-800/50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent opacity-50"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-5">
        <div className="text-center mb-8">
          <h2 className="text-md font-bold tracking-widest text-primary-600 uppercase mb-8">
            Project Context
          </h2>
          <p className="max-w-4xl mx-auto text-xl md:text-2xl text-slate-900 leading-relaxed font-light mb-12">
            This application was built as a <span className="text-primary-600 font-medium">non-profit SaaS-style project.</span> It focuses on solving a real problem with minimal interface rather than feature bloated one.
          </p>

          <h3 className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-0">
            Technologies used:
          </h3>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techStack.map((tech, index) => (
            <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm transition-all duration-300">
              <h3 className="text-primary-600 font-bold mb-4 uppercase tracking-wider text-xs">
                {tech.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tech.items.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className="px-3 py-1 text-sm bg-slate-900 text-slate-100 hover:bg-slate-800 hover:text-slate-200 rounded-full border border-slate-700/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectContextSection;
