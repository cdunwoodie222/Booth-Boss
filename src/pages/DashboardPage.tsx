import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useConvexAuth } from "@convex-dev/auth/react";
import StatCard from "../components/StatCard";
import { DollarSign, ShoppingCart, Wallet, TrendingUp, ArrowRight, CircleDollarSign, Receipt, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { user } = useConvexAuth();
  const userId = (user as any)?._id;
  const incomeEntries = useQuery(api.income.getForUser, userId ? { userId } : "skip");
  const expenseEntries = useQuery(api.expenses.getForUser, userId ? { userId } : "skip");
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  if (!incomeEntries || !expenseEntries) return <div className="flex items-center justify-center h-64"><p className="text-warm-brown text-lg">Loading your dashboard...</p></div>;

  const cm = new Date().toISOString().slice(0, 7);
  const cy = new Date().getFullYear().toString();
  const monthIncome = incomeEntries.filter((e: any) => e.date.startsWith(cm)).reduce((s: number, e: any) => s + e.totalSales + e.tips + e.productSales, 0);
  const monthExpenses = expenseEntries.filter((e: any) => e.date.startsWith(cm)).reduce((s: number, e: any) => s + e.amount, 0);
  const yearIncome = incomeEntries.filter((e: any) => e.date.startsWith(cy)).reduce((s: number, e: any) => s + e.totalSales + e.tips + e.productSales, 0);
  const allActivity = [...incomeEntries.map((e: any) => ({ ...e, type: "income" as const, total: e.totalSales + e.tips + e.productSales })), ...expenseEntries.map((e: any) => ({ ...e, type: "expense" as const, total: e.amount }))].sort((a: any, b: any) => b.date.localeCompare(a.date)).slice(0, 5);
  const hasData = incomeEntries.length > 0 || expenseEntries.length > 0;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-terracotta mb-2"><Star className="w-5 h-5 fill-current" /><span className="text-xs font-bold uppercase tracking-[0.2em]">Beauty Business Overview</span></div>
          <h1 className="text-5xl font-bold text-charcoal">Hello, Boss!</h1>
        </div>
        <div className="text-sm font-bold text-warm-brown bg-white/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-rose shadow-sm italic">"Your work is a beautiful reflection of you."</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Gross Income" value={formatCurrency(monthIncome)} icon={DollarSign} color="rose" />
        <StatCard label="Total Expenses" value={formatCurrency(monthExpenses)} icon={ShoppingCart} color="terracotta" />
        <StatCard label="What You Kept" value={formatCurrency(monthIncome - monthExpenses)} icon={Wallet} color="peach" />
        <StatCard label="Year to Date" value={formatCurrency(yearIncome)} icon={TrendingUp} color="champagne" />
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-charcoal">Recent Activity</h2>
          <Link to="/income" className="btn-secondary !py-2 !px-4 text-xs flex items-center gap-2">View Income <ArrowRight className="w-3 h-3" /></Link>
        </div>
        <div className="card !p-0 overflow-hidden border-rose/30">
          {!hasData ? (
            <div className="p-16 text-center">
              <div className="bg-rose w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6"><Star className="w-8 h-8 text-dusty-rose" /></div>
              <h3 className="text-2xl font-bold text-charcoal mb-3">Welcome to Booth Boss!</h3>
              <p className="text-warm-brown text-lg mb-8 max-w-md mx-auto">Start by logging your first income or expense. Everything you track shows up here.</p>
              <Link to="/income" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base"><CircleDollarSign className="w-5 h-5" /> Log Your First Income</Link>
            </div>
          ) : (
            <div className="divide-y divide-rose/20">
              {allActivity.map((item: any) => (
                <div key={item._id} className="p-6 flex items-center justify-between hover:bg-rose/20 transition-colors">
                  <div className="flex items-center gap-5">
                    <div className={`p-3.5 rounded-2xl ${item.type === "income" ? "bg-blush text-dusty-rose" : "bg-peach text-terracotta"}`}>
                      {item.type === "income" ? <CircleDollarSign className="w-6 h-6" /> : <Receipt className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="font-bold text-charcoal text-lg">{item.type === "income" ? "Client Visit" : item.category}</p>
                      <p className="text-sm text-warm-brown font-medium opacity-70 uppercase tracking-widest">{new Date(item.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</p>
                    </div>
                  </div>
                  <p className={`font-bold text-2xl ${item.type === "income" ? "text-dusty-rose" : "text-charcoal"}`}>{item.type === "income" ? "+" : "-"} {formatCurrency(item.total)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}