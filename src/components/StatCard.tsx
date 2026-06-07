import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: "pink" | "lavender" | "mint" | "coral" | "blue";
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatCard({ label, value, icon: Icon, color, trend }: StatCardProps) {
  const colorClasses = {
    pink: "bg-brand-pink text-pink-600",
    lavender: "bg-brand-lavender text-purple-600",
    mint: "bg-brand-mint text-emerald-600",
    coral: "bg-brand-coral text-orange-600",
    blue: "bg-brand-blue text-blue-600",
  };

  return (
    <div className="card flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-xl ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className={`text-xs font-bold ${trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend.isPositive ? '+' : '-'}{trend.value}%
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
