import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: "rose" | "terracotta" | "peach" | "gold" | "blush";
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatCard({ label, value, icon: Icon, color, trend }: StatCardProps) {
  const colorClasses = {
    rose: "bg-brand-rose-100 text-brand-rose-600",
    terracotta: "bg-orange-100 text-brand-terracotta",
    peach: "bg-brand-peach/50 text-orange-600",
    gold: "bg-yellow-100 text-brand-gold",
    blush: "bg-brand-blush/50 text-pink-600",
  };

  return (
    <div className="card flex flex-col group hover:border-brand-rose-200 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-xl ${colorClasses[color]} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className={`text-xs font-bold ${trend.isPositive ? 'text-emerald-600' : 'text-brand-rose-600'}`}>
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
