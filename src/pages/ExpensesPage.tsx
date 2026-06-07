import { useState } from "react";
import { Plus, Trash2, Calendar, CreditCard, Receipt } from "lucide-react";

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Expenses</h1>
          <p className="text-slate-500">Track your business spending and rent</p>
        </div>
        <div className="bg-brand-coral/50 border border-brand-coral px-6 py-3 rounded-2xl text-right">
          <p className="text-xs font-semibold text-orange-700 uppercase tracking-wider">Monthly Total</p>
          <p className="text-3xl font-bold text-orange-900">{formatCurrency(monthlyTotal)}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add New Expense
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Date
            </label>
            <input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <CreditCard className="w-3 h-3" /> Amount
            </label>
            <input type="number" step="0.01" className="input" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Receipt className="w-3 h-3" /> Category
            </label>
            <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
              {expenseCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1 lg:col-span-2">
            <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
              Notes (Optional)
            </label>
            <div className="flex gap-2">
              <input type="text" className="input" placeholder="Product name, vendor, etc." value={notes} onChange={e => setNotes(e.target.value)} />
              <button type="submit" disabled={loading} className="btn-primary flex-shrink-0 !px-6">
                {loading ? "..." : "Add Expense"}
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
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Notes</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center w-20">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {entries.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">
                    {new Date(e.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {e.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 italic max-w-xs truncate">
                    {e.notes || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">
                    {formatCurrency(e.amount)}
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
