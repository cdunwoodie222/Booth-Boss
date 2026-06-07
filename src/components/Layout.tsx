import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-brand-blue/30">
      <Sidebar />
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-100 p-4 flex items-center justify-between z-50">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Booth Boss
        </h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-slate-600" />
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
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
