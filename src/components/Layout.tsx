import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import { Sparkles, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-brand-cream">
      <Sidebar />
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-brand-rose-100/50 p-4 flex items-center justify-between z-50 shadow-sm shadow-brand-rose-100/10">
        <div className="flex items-center gap-2">
          <div className="bg-brand-rose-600 p-1.5 rounded-lg text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight font-serif">
            Booth Boss
          </h1>
        </div>
        <button 
          onClick={handleLogout}
          className="p-2 hover:bg-brand-rose-50 rounded-xl transition-colors text-slate-400 hover:text-brand-rose-600"
          title="Log out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      <main className="flex-1 p-6 md:p-12 lg:p-16 pt-24 md:pt-12 lg:pt-16 pb-32 md:pb-12">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
