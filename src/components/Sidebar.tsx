import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  CircleDollarSign, 
  Receipt, 
  Calculator,
  LogOut,
  User
} from "lucide-react";
import { useAuthActions, useConvexAuth } from "../hooks/useConvex";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Income", href: "/income", icon: CircleDollarSign },
  { label: "Expenses", href: "/expenses", icon: Receipt },
  { label: "Taxes", href: "/taxes", icon: Calculator },
];

export default function Sidebar() {
  const location = useLocation();
  const { signOut } = useAuthActions();
  useConvexAuth();
  const user = { name: "Boss", email: "boss@example.com" }; // Mock user

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col hidden md:flex h-screen sticky top-0">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Booth Boss
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive 
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-50 space-y-2">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-blue/50 border border-brand-blue/20">
          <div className="bg-white p-1.5 rounded-lg border border-slate-100">
            <User className="w-4 h-4 text-slate-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-900 truncate">
              {user?.name || "Boss"}
            </p>
            <p className="text-[10px] text-slate-500 truncate">
              {user?.email}
            </p>
          </div>
        </div>
        <button 
          onClick={() => signOut()}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log out
        </button>
      </div>
    </aside>
  );
}
