import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useConvexAuth } from "@convex-dev/auth/react";
import { Plus, Trash2 } from "lucide-react";

export default function IncomePage() {
  const { user } = useConvexAuth();
  const userId = (user as any)?._id;
  const entries = useQuery(api.income.getForUser, userId ? { userId } : "skip");
  const addIncome = useMutation(api.income.add);
  const deleteIncome = useMutation(api.income.remove);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [totalSales, setTotalSales] = useState("");
  const [tips, setTips] = useState("");
  const [productSales, setProductSales] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);
    try {
      await addIncome({ userId, date, totalSales: Number(totalSales) || 0, tips: Number(tips) || 0, productSales: Number(productSales) || 0 });
      setTotalSales(""); setTips(""); setProductSales("");
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fc = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);
  const cm = new Date().toISOString().slice(0, 7);
  const mt = entries ? entries.filter((e: any) => e.date.startsWith(cm)).reduce((s: number, e: any) => s + e.totalSales + e.tips + e.productSales, 0) : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold text-charcoal">Income</h1><p className="text-warm-brown font-medium">Track your daily earnings and tips</p></div>
        <div className="bg-blush/50 border border-rose px-6 py-3 rounded-2xl text-right">
          <p className="text-xs font-bold text-dusty-rose uppercase tracking-widest">Monthly Total</p>
          <p className="text-3xl font-bold text-charcoal">{entries ? fc(mt) : "..."}</p>
        </div>
      </div>
      <div className="card border-rose/30">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-charcoal"><Plus className="w-5 h-5 text-terracotta" /> Add New Entry</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1"><label className="text-xs font-bold text-warm-brown">Date</label><input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} required /></div>
          <div className="space-y-1"><label className="text-xs font-bold text-warm-brown">Total Sales $</label><input type="number" className="input" placeholder="0.00" value={totalSales} onChange={e => setTotalSales(e.target.value)} required /></div>
          <div className="space-y-1"><label className="text-xs font-bold text-warm-brown">Tips $</label><input type="number" className="input" placeholder="0.00" value={tips} onChange={e => setTips(e.target.value)} /></div>
          <div className="space-y-1"><label className="text-xs font-bold text-warm-brown">Products $</label>
            <div className="flex gap-2"><input type="number" className="input" placeholder="0.00" value={productSales} onChange={e => setProductSales(e.target.value)} /><button type="submit" disabled={loading || !userId} className="btn-primary flex-shrink-0 !px-6">{loading ? "..." : "Add"}</button></div>
          </div>
        </form>
      </div>
      <div className="card !p-0 overflow-hidden border-rose/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-rose/30 border-b border-rose/30">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-warm-brown uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-warm-brown uppercase tracking-widest text-right">Sales</th>
                <th className="px-6 py-4 text-xs font-bold text-warm-brown uppercase tracking-widest text-right">Tips</th>
                <th className="px-6 py-4 text-xs font-bold text-warm-brown uppercase tracking-widest text-right">Products</th>
                <th className="px-6 py-4 text-xs font-bold text-warm-brown uppercase tracking-widest text-right">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-warm-brown uppercase tracking-widest text-center w-20">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose/20">
              {!entries ? <tr><td colSpan={6} className="px-6 py-16 text-center text-warm-brown font-medium">Loading your income...</td></tr>
              : entries.length === 0 ? <tr><td colSpan={6} className="px-6 py-16 text-center"><p className="text-warm-brown font-medium mb-2">No income logged yet</p><p className="text-xs text-warm-brown/60">Use the form above to add your first entry</p></td></tr>
              : entries.map((e: any) => (
                <tr key={e._id} className="hover:bg-rose/10 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-charcoal">{new Date(e.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</td>
                  <td className="px-6 py-4 text-sm text-warm-brown text-right">{fc(e.totalSales)}</td>
                  <td className="px-6 py-4 text-sm text-warm-brown text-right">{fc(e.tips)}</td>
                  <td className="px-6 py-4 text-sm text-warm-brown text-right">{fc(e.productSales)}</td>
                  <td className="px-6 py-4 text-sm font-bold text-charcoal text-right">{fc(e.totalSales + e.tips + e.productSales)}</td>
                  <td className="px-6 py-4 text-center"><button onClick={() => deleteIncome({ id: e._id })} className="p-2 text-warm-brown/40 hover:text-dusty-rose transition-colors"><Trash2 className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}