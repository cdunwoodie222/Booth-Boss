import { useState } from "react";
import { Plus, Trash2, Calendar, DollarSign } from "lucide-react";

interface IncomeEntry {
  id: string;
  date: string;
  totalSales: number;
  tips: number;
  productSales: number;
}

export default function IncomePage() {
  const [entries, setEntries] = useState<IncomeEntry[]>([
    { id: "s1", date: "2024-03-20", totalSales: 150, tips: 30, productSales: 20 },
    { id: "s2", date: "2024-03-19", totalSales: 200, tips: 50, productSales: 0 },
    { id: "s3", date: "2024-03-18", totalSales: 120, tips: 25, productSales: 10 },
  ]);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [totalSales, setTotalSales] = useState("");
  const [tips, setTips] = useState("");
  const [productSales, setProductSales] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const newEntry: IncomeEntry = {
        id: Math.random().toString(36).substr(2, 9),
        date,
        totalSales: Number(totalSales) || 0,
        tips: Number(tips) || 0,
        productSales: Number(productSales) || 0,
      };
      setEntries([newEntry, ...entries]);
      setTotalSales("");
      setTips("");
      setProductSales("");
      setLoading(false);
    }, 300);
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyTotal = entries
    .filter(e => e.date.startsWith(currentMonth))
    .reduce((sum, e) => sum + e.totalSales + e.tips + e.productSales, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Income</h1>
          <p className="text-slate-500">Track your daily earnings and tips</p>
        </div>
        <div className="bg-brand-mint/50 border border-brand-mint px-6 py-3 rounded-2xl text-right">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Monthly Total</p>
          <p className="text-3xl font-bold text-emerald-900">{formatCurrency(monthlyTotal)}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add New Entry
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Date
            </label>
            <input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <DollarSign className="w-3 h-3" /> Total Sales
            </label>
            <input type="number" className="input" placeholder="0.00" value={totalSales} onChange={e => setTotalSales(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <DollarSign className="w-3 h-3" /> Tips
            </label>
            <input type="number" className="input" placeholder="0.00" value={tips} onChange={e => setTips(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <DollarSign className="w-3 h-3" /> Products
            </label>
            <div className="flex gap-2">
              <input type="number" className="input" placeholder="0.00" value={productSales} onChange={e => setProductSales(e.target.value)} />
              <button type="submit" disabled={loading} className="btn-primary flex-shrink-0 !px-6">
                {loading ? "..." : "Add Income"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Sales</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Tips</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Products</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center w-20">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {entries.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {new Date(e.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-right">{formatCurrency(e.totalSales)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-right">{formatCurrency(e.tips)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-right">{formatCurrency(e.productSales)}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">
                    {formatCurrency(e.totalSales + e.tips + e.productSales)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => deleteEntry(e.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
