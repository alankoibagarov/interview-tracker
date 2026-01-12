import GithubIcon from '@/assets/icons/GithubIcon';
import LinkedInIcon from '@/assets/icons/LinkedInIcon';
import TelegramIcon from '@/assets/icons/TelegramIcon';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800 relative z-10">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold bg-clip-text text-primary-400 hover:text-primary-300 transition-all duration-300">
            Interview Flow
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Empowering professionals to master their interviews with smart tracking.
          </p>
        </div>

        <div>
          <p className="font-normal text-sm mb-4 text-slate-100">Licensed under <a href="https://github.com/alankoibagarov/interview-tracker/blob/main/LICENSE" className="text-primary-400 hover:text-primary-300 transition-all duration-300">MIT</a></p>
          <p className="font-normal text-sm mb-4 text-slate-100">Permission granted to use, modify, and distribute the software for any purpose.</p>
          <p className="font-normal text-sm mb-4 text-slate-100">An open-source project by <a href="https://github.com/alankoibagarov" className="text-primary-400 hover:text-primary-300 transition-all duration-300">Alan Koibagarov</a></p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4 text-slate-100">Connect</h4>
          <div className="flex space-x-4">
             {/* Social placeholders */}
             <a target='_blank' href="https://www.linkedin.com/in/alankoibagarov" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all">
               <span className="sr-only">LinkedIn</span>
               <LinkedInIcon className="w-5 h-5 fill-current"/>
             </a>
             <a target='_blank' href="https://github.com/alankoibagarov" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all">
               <span className="sr-only">GitHub</span>
               <GithubIcon className="w-5 h-5 fill-current"/>
             </a>
             <a target='_blank' href="https://t.me/akoibagarov" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all">
               <span className="sr-only">Telegram</span>
               <TelegramIcon className="w-5 h-5 fill-current"/>
             </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Interview Flow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
