import { useState } from "react";
import { Plus, Trash2, Calendar, CreditCard, Receipt, ArrowDownRight } from "lucide-react";

export const expenseCategories = [
  "Booth Rent",
  "Products",
  "Skincare Products",
  "Nail Supplies",
  "Lash & Brow Supplies",
  "Massage Supplies",
  "Tools & Equipment",
  "Education",
  "Marketing",
  "Other",
] as const;

interface ExpenseEntry {
  id: string;
  date: string;
  amount: number;
  category: string;
  notes?: string;
}

export default function ExpensesPage() {
  const [entries, setEntries] = useState<ExpenseEntry[]>([
    { id: "e1", date: "2024-03-01", category: "Booth Rent", amount: 600, notes: "Weekly rent" },
    { id: "e2", date: "2024-03-05", category: "Products", amount: 150, notes: "Supplies and inventory" },
    { id: "e3", date: "2024-03-10", category: "Marketing", amount: 100, notes: "Instagram ads" },
  ]);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Booth Rent");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const newEntry: ExpenseEntry = {
        id: Math.random().toString(36).substr(2, 9),
        date,
        amount: Number(amount) || 0,
        category,
        notes: notes || undefined,
      };
      setEntries([newEntry, ...entries]);
      setAmount("");
      setNotes("");
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
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Expenses</h1>
          <p className="text-slate-500 font-medium mt-1">Track your business spending and rent</p>
        </div>
        <div className="bg-orange-50 border border-orange-100 px-6 py-4 rounded-2xl text-right flex items-center gap-4 shadow-sm">
          <div>
            <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">Monthly Total</p>
            <p className="text-3xl font-bold text-orange-900">{formatCurrency(monthlyTotal)}</p>
          </div>
          <div className="bg-orange-500 p-2 rounded-xl text-white shadow-lg shadow-orange-200">
            <ArrowDownRight className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="card border-brand-rose-100/30">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
          <div className="bg-brand-rose-100 p-1.5 rounded-lg text-brand-rose-600">
            <Plus className="w-5 h-5" />
          </div>
          Add New Expense
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-rose-400" /> Date
            </label>
            <input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-brand-rose-400" /> Amount
            </label>
            <input type="number" step="0.01" className="input" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 flex items-center gap-1.5">
              <Receipt className="w-4 h-4 text-brand-rose-400" /> Category
            </label>
            <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
              {expenseCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2 lg:col-span-2">
            <label className="text-sm font-bold text-slate-600 flex items-center gap-1.5">
              Notes (Optional)
            </label>
            <div className="flex gap-3">
              <input type="text" className="input" placeholder="Product name, vendor, etc." value={notes} onChange={e => setNotes(e.target.value)} />
              <button type="submit" disabled={loading} className="btn-primary flex-shrink-0 px-8 shadow-brand-rose-200">
                {loading ? "..." : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="card !p-0 overflow-hidden border-brand-rose-100/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-brand-rose-50/50 border-b border-brand-rose-100/30">
              <tr>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Category</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Notes</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Amount</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-center w-20">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-rose-50/50">
              {entries.map((e) => (
                <tr key={e.id} className="hover:bg-brand-rose-50/20 transition-colors">
                  <td className="px-6 py-5 text-sm font-bold text-slate-900 whitespace-nowrap">
                    {new Date(e.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </td>
                  <td className="px-6 py-5 text-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-rose-50 text-brand-rose-700 border border-brand-rose-100">
                      {e.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-500 font-medium italic max-w-xs truncate">
                    {e.notes || "—"}
                  </td>
                  <td className="px-6 py-5 text-base font-bold text-slate-900 text-right">
                    {formatCurrency(e.amount)}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button onClick={() => deleteEntry(e.id)} className="p-2.5 text-slate-400 hover:text-brand-rose-600 hover:bg-brand-rose-50 rounded-xl transition-all">
                      <Trash2 className="w-4.5 h-4.5" />
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
