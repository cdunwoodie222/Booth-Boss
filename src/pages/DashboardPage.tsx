import StatCard from "../components/StatCard";
import { 
  DollarSign, 
  ShoppingCart, 
  Wallet, 
  TrendingUp,
  ArrowRight,
  CircleDollarSign,
  Receipt
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const sampleIncome = 4250;
  const sampleExpenses = 1850;
  const sampleNet = sampleIncome - sampleExpenses;
  const sampleYearToDate = 12400;

  const sampleActivity = [
    { id: "1", date: "2024-03-20", type: "income", category: "Client Visit", total: 150 },
    { id: "2", date: "2024-03-19", type: "expense", category: "Booth Rent", total: 200 },
    { id: "3", date: "2024-03-18", type: "income", category: "Product Sale", total: 45 },
    { id: "4", date: "2024-03-17", type: "expense", category: "Professional Supplies", total: 85 },
    { id: "5", date: "2024-03-16", type: "income", category: "Client Visit", total: 220 },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Hello, Boss!</h1>
          <p className="text-slate-500 font-medium">Here's your business at a glance.</p>
        </div>
        <div className="text-sm font-semibold text-brand-rose-600 bg-brand-rose-50 px-4 py-2 rounded-full border border-brand-rose-100">
          March 2024
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Gross Income" 
          value={formatCurrency(sampleIncome)} 
          icon={DollarSign} 
          color="rose" 
        />
        <StatCard 
          label="Total Expenses" 
          value={formatCurrency(sampleExpenses)} 
          icon={ShoppingCart} 
          color="terracotta" 
        />
        <StatCard 
          label="What You Kept" 
          value={formatCurrency(sampleNet)} 
          icon={Wallet} 
          color="gold" 
        />
        <StatCard 
          label="Year to Date" 
          value={formatCurrency(sampleYearToDate)} 
          icon={TrendingUp} 
          color="peach" 
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Recent Activity</h2>
          <div className="flex gap-4">
            <Link to="/income" className="text-sm font-bold text-brand-rose-600 hover:text-brand-rose-700 flex items-center gap-1 transition-colors">
              Income <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/expenses" className="text-sm font-bold text-brand-rose-600 hover:text-brand-rose-700 flex items-center gap-1 transition-colors">
              Expenses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="card !p-0 overflow-hidden border-brand-rose-100/30">
          <div className="divide-y divide-brand-rose-50">
            {sampleActivity.map((item: any) => (
              <div key={item.id} className="p-5 flex items-center justify-between hover:bg-brand-rose-50/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${item.type === "income" ? "bg-brand-rose-50 text-brand-rose-600" : "bg-orange-50 text-brand-terracotta"}`}>
                    {item.type === "income" ? <CircleDollarSign className="w-5 h-5" /> : <Receipt className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">
                      {item.category}
                    </p>
                    <p className="text-sm text-slate-500 font-medium">{new Date(item.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</p>
                  </div>
                </div>
                <p className={`font-bold text-xl ${item.type === "income" ? "text-emerald-600" : "text-slate-900"}`}>
                  {item.type === "income" ? "+" : "-"} {formatCurrency(item.total)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
