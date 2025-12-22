import React from 'react';

const TermsOfUsage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Terms of Usage</h1>
      
      <div className="space-y-6 text-slate-700 dark:text-slate-300">
        <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">1. Introduction</h2>
            <p>Welcome to Interview Flow. By accessing our website and using our services, you agree to be bound by the following terms and conditions.</p>
        </section>

        <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">2. Use of Service</h2>
            <p>You agree to use our service only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.</p>
        </section>

        <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">3. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
        </section>

        <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">4. Intellectual Property</h2>
            <p>The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights and other proprietary (including but not limited to intellectual property) rights.</p>
        </section>

        <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">5. Termination</h2>
            <p>We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
        </section>
        
        <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">6. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUsage;
