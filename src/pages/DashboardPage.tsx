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
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Hello, Boss!</h1>
        <p className="text-slate-500">Here's how your business is doing this month.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Gross Income" 
          value={formatCurrency(sampleIncome)} 
          icon={DollarSign} 
          color="mint" 
        />
        <StatCard 
          label="Total Expenses" 
          value={formatCurrency(sampleExpenses)} 
          icon={ShoppingCart} 
          color="coral" 
        />
        <StatCard 
          label="What You Kept" 
          value={formatCurrency(sampleNet)} 
          icon={Wallet} 
          color="lavender" 
        />
        <StatCard 
          label="Year to Date" 
          value={formatCurrency(sampleYearToDate)} 
          icon={TrendingUp} 
          color="blue" 
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
          <div className="flex gap-4">
            <Link to="/income" className="text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1">
              Income <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/expenses" className="text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1">
              Expenses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="card !p-0 overflow-hidden">
          <div className="divide-y divide-slate-50">
            {sampleActivity.map((item: any) => (
              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${item.type === "income" ? "bg-brand-mint text-emerald-600" : "bg-brand-coral text-orange-600"}`}>
                    {item.type === "income" ? <CircleDollarSign className="w-5 h-5" /> : <Receipt className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {item.category}
                    </p>
                    <p className="text-xs text-slate-500">{new Date(item.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</p>
                  </div>
                </div>
                <p className={`font-bold ${item.type === "income" ? "text-emerald-600" : "text-slate-900"}`}>
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
