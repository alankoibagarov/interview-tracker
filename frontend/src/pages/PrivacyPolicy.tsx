import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Privacy Policy</h1>
      
      <div className="space-y-6 text-slate-700 dark:text-slate-300">
        <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">1. Information Collection</h2>
            <p>We collect information you provide directly to us when you create an account, specifically your username and email address. We also collect data regarding your interviews that you input into the system.</p>
        </section>

        <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">2. Use of Information</h2>
            <p>We use the information we collect to operate, maintain, and provide the features of the service, to communicate with you, and to personalize your experience.</p>
        </section>

        <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">3. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect specific personal information. However, please note that no method of transmission over the internet is 100% secure.</p>
        </section>

        <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">4. Cookies</h2>
            <p>We may use cookies and similar tracking technologies to track the activity on our service and hold certain information to improve your experience.</p>
        </section>

        <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">5. Third-Party Services</h2>
            <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website.</p>
        </section>
        
        <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
