import React from 'react';
import { Coffee, Loader2 } from 'lucide-react';
import { Link } from "react-router-dom";



export default function MarketplaceUnderDevelopment() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-linear-to-br from-[#fdfbfb] to-[#ebedee] font-sans selection:bg-blue-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        .fade-in {
          animation: fadeIn 1.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .tea-steam {
          animation: steam 3s infinite ease-in-out;
        }

        @keyframes steam {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { transform: translateY(-8px) scale(1.05); opacity: 1; }
        }
      `}</style>


    <div className="fixed top-4 left-4 z-50">
          <Link 
              to="/"
              className="fixed top-4 right-4 z-50 group flex items-center gap-3 px-3 py-1 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 shadow-sm transition-all duration-300 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5"
          >
              <span>Home</span>
          </Link>
      </div>

      <div className="max-w-2xl w-full text-center fade-in">
        
        {/* Visual Icon */}
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <div className="tea-steam bg-white p-6 rounded-full shadow-sm border border-slate-100">
              <Coffee size={48} className="text-slate-700" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full" />
          </div>
        </div>

        {/* Main Content */}
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-800 mb-6 font-serif">
          Thank you for signing up.
        </h1>
        
        <a className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed font-light">
          The marketplace is <span className="font-semibold text-slate-900 underline decoration-blue-200 decoration-2 underline-offset-4">under development</span> at the moment.
        </a>

        <div className="h-px w-24 bg-slate-300 mx-auto mb-8" />

        <a className="text-xl md:text-2xl text-slate-500 italic font-serif leading-relaxed">
          Sip tea, relax and wait for the masterpiece...
        </a>

        {/* Status Tag */}
        <div className="mt-12">
          <span className="inline-flex items-center px-5 py-2 rounded-full text-sm font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all hover:shadow-md cursor-default">
            <Loader2 className="animate-spin -ml-1 mr-3 h-4 w-4 text-blue-500" />
            Crafting excellence...
          </span>
        </div>
      </div>

      {/* Footer Decoration */}
      <footer className="fixed bottom-8 left-0 right-0 text-center">
        <p className="text-slate-400 text-[10px] md:text-xs tracking-[0.2em] uppercase">
          &copy; {new Date().getFullYear()} Urusentra Marketplace
        </p>
      </footer>
    </div>
  );
}