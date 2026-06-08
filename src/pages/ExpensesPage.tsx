import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useConvexAuth } from "@convex-dev/auth/react";
import { Plus, Trash2 } from "lucide-react";

export const expenseCategories = ["Booth / Suite Rent", "Professional Supplies", "Retail Products", "Tools & Equipment", "Education", "Marketing", "Insurance & Licenses", "Other"] as const;

export default function ExpensesPage() {
  const { user } = useConvexAuth();
  const userId = (user as any)?._id;
  const entries = useQuery(api.expenses.getForUser, userId ? { userId } : "skip");
  const addExpense = useMutation(api.expenses.add);
  const deleteExpense = useMutation(api.expenses.remove);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(expenseCategories[0]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);
    try { await addExpense({ userId, date, amount: Number(amount) || 0, category, notes: notes || undefined }); setAmount(""); setNotes(""); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fc = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);
  const cm = new Date().toISOString().slice(0, 7);
  const mt = entries ? entries.filter((e: any) => e.date.startsWith(cm)).reduce((s: number, e: any) => s + e.amount, 0) : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold text-charcoal">Expenses</h1><p className="text-warm-brown font-medium">Track your business spending</p></div>
        <div className="bg-peach/50 border border-peach px-6 py-3 rounded-2xl text-right">
          <p className="text-xs font-bold text-terracotta uppercase tracking-widest">Monthly Total</p>
          <p className="text-3xl font-bold text-charcoal">{entries ? fc(mt) : "..."}</p>
        </div>
      </div>
      <div className="card border-rose/30">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-charcoal"><Plus className="w-5 h-5 text-terracotta" /> Add New Expense</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1"><label className="text-xs font-bold text-warm-brown">Date</label><input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} required /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-warm-brown">Amount $</label><input type="number" step="0.01" className="input" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} required /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1"><label className="text-xs font-bold text-warm-brown">Category</label>
              <select className="input" value={category} onChange={e => setCategory(e.target.value)}>{expenseCategories.map(c => <option key={c} value={c}>{c}</option>)}</select>
            </div>
            <div className="space-y-1"><label className="text-xs font-bold text-warm-brown">Notes</label>
              <div className="flex gap-2"><input type="text" className="input" placeholder="Optional" value={notes} onChange={e => setNotes(e.target.value)} /><button type="submit" disabled={loading || !userId} className="btn-primary flex-shrink-0 !px-6">{loading ? "..." : "Add"}</button></div>
            </div>
          </div>
        </form>
      </div>
      <div className="card !p-0 overflow-hidden border-rose/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-rose/30 border-b border-rose/30">
              <tr><th className="px-6 py-4 text-xs font-bold text-warm-brown uppercase tracking-widest">Date</th><th className="px-6 py-4 text-xs font-bold text-warm-brown uppercase tracking-widest">Category</th><th className="px-6 py-4 text-xs font-bold text-warm-brown uppercase tracking-widest">Notes</th><th className="px-6 py-4 text-xs font-bold text-warm-brown uppercase tracking-widest text-right">Amount</th><th className="px-6 py-4 text-xs font-bold text-warm-brown uppercase tracking-widest text-center w-20">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-rose/20">
              {!entries ? <tr><td colSpan={5} className="px-6 py-16 text-center text-warm-brown font-medium">Loading expenses...</td></tr>
              : entries.length === 0 ? <tr><td colSpan={5} className="px-6 py-16 text-center"><p className="text-warm-brown font-medium mb-2">No expenses logged yet</p><p className="text-xs text-warm-brown/60">Use the form above to add your first expense</p></td></tr>
              : entries.map((e: any) => (
                <tr key={e._id} className="hover:bg-rose/10 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-charcoal whitespace-nowrap">{new Date(e.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</td>
                  <td className="px-6 py-4 text-sm"><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose/50 text-dusty-rose">{e.category}</span></td>
                  <td className="px-6 py-4 text-sm text-warm-brown italic">{e.notes || "—"}</td>
                  <td className="px-6 py-4 text-sm font-bold text-charcoal text-right">{fc(e.amount)}</td>
                  <td className="px-6 py-4 text-center"><button onClick={() => deleteExpense({ id: e._id })} className="p-2 text-warm-brown/40 hover:text-dusty-rose transition-colors"><Trash2 className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}