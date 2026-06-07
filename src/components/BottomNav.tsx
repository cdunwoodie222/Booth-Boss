import { Link, useLocation } from "react-router-dom";
import { navItems } from "../constants/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-brand-rose-100/50 px-6 py-3 pb-8 z-50 flex items-center justify-between">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors relative",
              isActive ? "text-brand-rose-600" : "text-slate-400 hover:text-brand-rose-400"
            )}
          >
            <item.icon className={cn("w-6 h-6", isActive && "animate-pulse-subtle")} />
            <span className="text-[10px] font-medium uppercase tracking-widest">
              {item.label}
            </span>
            {isActive && (
              <div className="w-1 h-1 rounded-full bg-brand-rose-600 absolute -bottom-2" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
