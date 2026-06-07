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
          <h1 className="text-3xl font-bold text-slate-900">Taxes</h1>
          <p className="text-slate-500">Simple quarterly tax estimation</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-700">{quarterNames[currentQuarter-1]} Quarter {currentYear}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="card bg-slate-900 text-white border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-slate-400 mb-6">
                <Calculator className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Estimated Tax Savings</span>
              </div>
              
              <h2 className="text-5xl font-bold mb-2">
                {formatCurrency(taxEstimate)}
              </h2>
              <p className="text-slate-400 mb-8">Recommended to set aside for {quarterNames[currentQuarter-1]} Quarter</p>
              
              <div className="bg-white/10 p-4 rounded-2xl flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-brand-mint shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  We recommend setting aside <span className="text-white font-bold">25% of what you keep</span> for taxes. That way, when tax season comes, you're covered — no surprises.
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 text-lg">Quarterly Overview</h3>
              <Wallet className="w-6 h-6 text-slate-400" />
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">What you kept this quarter (net)</p>
                  <p className="text-3xl font-bold text-slate-900">{formatCurrency(whatYouKept)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-500 mb-1">Set aside for taxes (25%)</p>
                  <p className="text-3xl font-bold text-emerald-600">{formatCurrency(taxEstimate)}</p>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  Note: This is an estimate based on your logged income and expenses. We recommend putting this amount in a separate savings account so you're ready for quarterly payments.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card bg-brand-lavender border-brand-lavender/50">
            <h3 className="font-bold text-slate-900 mb-2">Federal Deadlines</h3>
            <div className="space-y-3 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Q1 (Jan-Mar)</span>
                <span className="font-bold text-slate-900">April 15</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Q2 (Apr-Jun)</span>
                <span className="font-bold text-slate-900">June 15</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Q3 (Jul-Sep)</span>
                <span className="font-bold text-slate-900">Sept 15</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Q4 (Oct-Dec)</span>
                <span className="font-bold text-slate-900">Jan 15</span>
              </div>
            </div>
            <a 
              href="https://www.irs.gov/payments" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
            >
              Pay on IRS.gov <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
