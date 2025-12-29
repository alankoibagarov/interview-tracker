import React from "react";

const ProductSection: React.FC = () => {
  const products = [
    {
      title: "Track interviews chronologically",
      image: "/landing/interview-list.png",
      description: "Keep a clear history of your journey. See every opportunity in one place and stay organized as you progress.",
    },
    {
      title: "Reflect right after the call",
      image: "/landing/interview-details.png",
      description: "Capture fresh insights. Note down what worked, what didn't, and the key questions that were asked.",
    },
    {
      title: "See patterns over time",
      image: "/landing/stats-overview.png",
      description: "Data-driven growth. Track your success rate and identify areas for improvement with detailed analytics.",
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden min-h-screen">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-100 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-5">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-4">
            Product Preview
          </h2>
          <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            What you get
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Everything you need to master your interview process.
          </p>
        </div>

        <div className="flex flex-col gap-24">
          {products.map((product, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 items-center`}
            >
              <div className="w-full lg:w-3/5">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-2/5 space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 text-primary-600 rounded-xl font-bold text-xl">
                  0{index + 1}
                </div>
                <h4 className="text-3xl font-bold text-slate-900 leading-tight">
                  {product.title}
                </h4>
                <p className="text-xl text-slate-600 leading-relaxed">
                  {product.description}
                </p>
                <div className="pt-4">
                  <div className="h-1 w-20 bg-primary-500 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
