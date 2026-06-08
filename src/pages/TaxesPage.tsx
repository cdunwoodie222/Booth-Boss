import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useConvexAuth } from "@convex-dev/auth/react";
import { Calculator, AlertCircle, Calendar, ArrowRight, Wallet } from "lucide-react";

export default function TaxesPage() {
  const { user } = useConvexAuth();
  const userId = (user as any)?._id;
  const incomeEntries = useQuery(api.income.getForUser, userId ? { userId } : "skip");
  const expenseEntries = useQuery(api.expenses.getForUser, userId ? { userId } : "skip");

  const now = new Date();
  const q = Math.ceil((now.getMonth() + 1) / 3);
  const y = now.getFullYear();
  const qm = { 1: ["01","02","03"], 2: ["04","05","06"], 3: ["07","08","09"], 4: ["10","11","12"] }[q as 1|2|3|4];
  const inQ = (d: string) => { const [y, m] = d.split("-"); return y === y.toString() && qm!.includes(m); };
  const qi = incomeEntries?.filter((e: any) => inQ(e.date)).reduce((s: number, e: any) => s + e.totalSales + e.tips + e.productSales, 0) || 0;
  const qe = expenseEntries?.filter((e: any) => inQ(e.date)).reduce((s: number, e: any) => s + e.amount, 0) || 0;
  const kept = qi - qe;
  const tax = Math.max(0, kept * 0.25);
  const qp = (((now.getMonth() % 3) + (now.getDate() / new Date(y, now.getMonth() + 1, 0).getDate())) / 3) * 100;
  const fc = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);
  const qn = ["First","Second","Third","Fourth"];
  const loading = !incomeEntries || !expenseEntries;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold text-charcoal">Taxes</h1><p className="text-warm-brown font-medium">Simple quarterly tax estimation</p></div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-rose shadow-sm"><Calendar className="w-4 h-4 text-dusty-rose" /><span className="text-sm font-bold text-charcoal">{qn[q-1]} Quarter {y}</span></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {loading ? <div className="card border-rose/30 flex items-center justify-center h-48"><p className="text-warm-brown font-medium">Calculating your estimates...</p></div>
          : <>
            <div className="card bg-charcoal text-white border-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rosegold/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-white/50 mb-6"><Calculator className="w-5 h-5" /><span className="text-sm font-bold uppercase tracking-widest">Tax Savings Goal</span></div>
                <h2 className="text-5xl font-bold mb-2">{fc(tax)}</h2>
                <p className="text-white/50 mb-8">Set aside for {qn[q-1]} Quarter</p>
                <div className="bg-white/10 p-4 rounded-2xl flex items-start gap-4"><AlertCircle className="w-5 h-5 text-rosegold shrink-0 mt-0.5" /><p className="text-sm text-white/70 leading-relaxed">Set aside <span className="text-white font-bold">25% of what you keep</span> for taxes. No surprises come tax day.</p></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card border-rose/30"><p className="text-xs font-bold text-warm-brown uppercase tracking-widest mb-1">What you earned</p><p className="text-3xl font-bold text-charcoal">{fc(qi)}</p></div>
              <div className="card border-rose/30"><p className="text-xs font-bold text-warm-brown uppercase tracking-widest mb-1">What you spent</p><p className="text-3xl font-bold text-charcoal">{fc(qe)}</p></div>
            </div>
            <div className="card border-rose/30">
              <div className="flex items-center justify-between mb-8"><h3 className="font-bold text-charcoal text-xl">What you kept so far</h3><p className="text-3xl font-bold text-charcoal">{fc(kept)}</p></div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-warm-brown uppercase tracking-widest"><span>Quarter Progress</span><span>{Math.round(qp)}%</span></div>
                <div className="w-full h-3 bg-rose/50 rounded-full overflow-hidden"><div className="h-full bg-terracotta rounded-full transition-all duration-1000" style={{ width: `${qp}%` }}></div></div>
                <p className="text-[10px] text-warm-brown/60 text-right italic pt-1">Quarter ends {new Date(y, q * 3, 0).toLocaleDateString()}</p>
              </div>
            </div>
          </>}
        </div>
        <div className="space-y-6">
          <div className="card bg-peach/50 border-peach border-2">
            <div className="bg-white p-3 rounded-2xl w-fit mb-4 border border-rose shadow-sm"><Wallet className="w-6 h-6 text-terracotta" /></div>
            <h3 className="font-bold text-charcoal mb-2">Payment Due Dates</h3>
            <div className="space-y-3 mt-4 text-sm">
              <div className="flex justify-between"><span className="text-warm-brown">Q1 (Jan-Mar)</span><span className="font-bold text-charcoal">April 15</span></div>
              <div className="flex justify-between"><span className="text-warm-brown">Q2 (Apr-Jun)</span><span className="font-bold text-charcoal">June 15</span></div>
              <div className="flex justify-between"><span className="text-warm-brown">Q3 (Jul-Sep)</span><span className="font-bold text-charcoal">Sept 15</span></div>
              <div className="flex justify-between"><span className="text-warm-brown">Q4 (Oct-Dec)</span><span className="font-bold text-charcoal">Jan 15</span></div>
            </div>
            <a href="https://www.irs.gov/payments" target="_blank" rel="noopener noreferrer" className="btn-primary w-full mt-6 flex items-center justify-center gap-2">Pay on IRS.gov <ArrowRight className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}