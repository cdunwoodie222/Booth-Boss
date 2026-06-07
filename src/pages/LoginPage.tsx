import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Standalone mock login
    setTimeout(() => {
      if (email && password) {
        navigate("/dashboard");
      } else {
        setError("Please enter email and password");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-brand-rose-50/50 flex flex-col items-center justify-center p-4">
      <div className="mb-10 flex flex-col items-center">
        <div className="bg-brand-rose-600 p-4 rounded-3xl mb-6 text-white shadow-xl shadow-brand-rose-200 ring-8 ring-white">
          <Sparkles className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 font-serif tracking-tight">Booth Boss</h1>
        <p className="text-brand-rose-900/60 font-medium mt-2">Track what you earn, spend, and keep</p>
      </div>

      <div className="card w-full max-w-md shadow-xl shadow-brand-rose-100/50 border-brand-rose-100/20 p-10">
        <h2 className="text-2xl font-bold mb-8 text-center text-slate-900 font-serif italic">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">
              Email Address
            </label>
            <input
              type="email"
              className="input bg-white py-3"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">
              Password
            </label>
            <input
              type="password"
              className="input bg-white py-3"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-brand-rose-600 text-sm font-bold bg-brand-rose-50 p-3 rounded-xl border border-brand-rose-100">{error}</p>
          )}

          <button
            type="submit"
            className="btn-primary w-full py-4 text-lg shadow-lg shadow-brand-rose-200 mt-4"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-10 text-center text-sm font-medium text-slate-500 border-t border-brand-rose-50 pt-8">
          Don't have an account?{" "}
          <Link to="/signup" className="text-brand-rose-600 font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
