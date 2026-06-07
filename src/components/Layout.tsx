import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-brand-cream">
      <Sidebar />
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-brand-rose-100/50 p-4 flex items-center justify-between z-50 shadow-sm shadow-brand-rose-100/10">
        <div className="flex items-center gap-2">
          <div className="bg-brand-rose-600 p-1.5 rounded-lg text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight font-serif">
            Booth Boss
          </h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-brand-rose-50 rounded-xl transition-colors text-brand-rose-600"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-64 h-full bg-white animate-in slide-in-from-left duration-200" onClick={e => e.stopPropagation()}>
            <Sidebar />
          </div>
        </div>
      )}

      <main className="flex-1 p-6 md:p-12 lg:p-16 pt-24 md:pt-12 lg:pt-16">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
