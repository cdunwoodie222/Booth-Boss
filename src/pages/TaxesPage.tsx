import { Calculator, AlertCircle, Calendar, ArrowRight, Wallet } from "lucide-react";

export default function TaxesPage() {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentQuarter = Math.ceil(currentMonth / 3);
  const currentYear = now.getFullYear();

  // Mock data for standalone mode
  const whatYouKept = 2400; // Matches dashboard net
  const taxEstimate = whatYouKept * 0.25;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const quarterNames = ["First", "Second", "Third", "Fourth"];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Taxes</h1>
          <p className="text-slate-500 font-medium mt-1">Simple quarterly tax estimation</p>
        </div>
        <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-2xl border border-brand-rose-100/50 shadow-sm shadow-brand-rose-100/20">
          <Calendar className="w-5 h-5 text-brand-rose-400" />
          <span className="text-sm font-bold text-slate-700">{quarterNames[currentQuarter-1]} Quarter {currentYear}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="card bg-slate-900 text-white border-none relative overflow-hidden p-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-rose-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-rose-400/5 rounded-full -ml-32 -mb-32 blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-brand-rose-300 mb-8">
                <Calculator className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Estimated Tax Savings</span>
              </div>
              
              <h2 className="text-6xl font-bold mb-3 font-serif tracking-tight text-brand-rose-50">
                {formatCurrency(taxEstimate)}
              </h2>
              <p className="text-slate-400 text-lg font-medium mb-10">Recommended to set aside for {quarterNames[currentQuarter-1]} Quarter</p>
              
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-start gap-4 backdrop-blur-sm">
                <AlertCircle className="w-6 h-6 text-brand-rose-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  We recommend setting aside <span className="text-brand-rose-200 font-bold">25% of what you keep</span> for taxes. That way, when tax season comes, you're covered — no surprises.
                </p>
              </div>
            </div>
          </div>

          <div className="card border-brand-rose-100/30">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900 text-xl">Quarterly Overview</h3>
              <div className="bg-brand-rose-50 p-2 rounded-xl text-brand-rose-600">
                <Wallet className="w-6 h-6" />
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="flex justify-between items-end pb-8 border-b border-brand-rose-50">
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">What you kept (net)</p>
                  <p className="text-4xl font-bold text-slate-900 font-serif">{formatCurrency(whatYouKept)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Set aside (25%)</p>
                  <p className="text-4xl font-bold text-emerald-600 font-serif">{formatCurrency(taxEstimate)}</p>
                </div>
              </div>
              
              <div className="p-5 bg-brand-rose-50/30 rounded-2xl border border-brand-rose-100/50">
                <p className="text-sm text-slate-600 leading-relaxed italic font-medium">
                  Note: This is an estimate based on your logged income and expenses. We recommend putting this amount in a separate savings account so you're ready for quarterly payments.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card bg-brand-rose-50 border-brand-rose-200/50 p-8 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-rose-600" />
              Federal Deadlines
            </h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center py-2 border-b border-brand-rose-100/50">
                <span className="text-slate-600 font-medium">Q1 (Jan-Mar)</span>
                <span className="font-bold text-slate-900">April 15</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-brand-rose-100/50">
                <span className="text-slate-600 font-medium">Q2 (Apr-Jun)</span>
                <span className="font-bold text-slate-900">June 15</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-brand-rose-100/50">
                <span className="text-slate-600 font-medium">Q3 (Jul-Sep)</span>
                <span className="font-bold text-slate-900">Sept 15</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600 font-medium">Q4 (Oct-Dec)</span>
                <span className="font-bold text-slate-900">Jan 15</span>
              </div>
            </div>
            <a 
              href="https://www.irs.gov/payments" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary w-full mt-8 flex items-center justify-center gap-2 py-3 rounded-2xl shadow-lg shadow-brand-rose-200"
            >
              Pay on IRS.gov <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
