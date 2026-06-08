import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

export default function SignUpPage() {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signIn("password", { email, password, name, flow: "register" });
      navigate("/dashboard");
    } catch (err) {
      setError("Could not create account. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach to-rose flex flex-col items-center justify-center p-4">
      <div className="mb-10 flex flex-col items-center">
        <div className="bg-white p-4 rounded-3xl mb-6 text-terracotta shadow-xl shadow-rosegold/20 ring-8 ring-white/50"><Sparkles className="w-10 h-10" /></div>
        <h1 className="text-5xl font-bold text-charcoal tracking-tight">Booth Boss</h1>
        <p className="text-warm-brown font-semibold mt-3 tracking-wide uppercase text-xs">Track what you earn, spend, and keep</p>
      </div>
      <div className="card w-full max-w-md border-rose p-10 shadow-2xl shadow-rosegold/20">
        <h2 className="text-2xl font-bold mb-8 text-center text-charcoal italic">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2"><label className="block text-sm font-bold text-warm-brown ml-1">Name</label><input type="text" className="input py-3" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required /></div>
          <div className="space-y-2"><label className="block text-sm font-bold text-warm-brown ml-1">Email Address</label><input type="email" className="input py-3" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div className="space-y-2"><label className="block text-sm font-bold text-warm-brown ml-1">Password</label><input type="password" className="input py-3" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          {error && <p className="text-dusty-rose text-sm font-bold bg-rose p-3 rounded-xl border border-rose">{error}</p>}
          <button type="submit" className="btn-primary w-full py-4 text-lg mt-4" disabled={loading}>{loading ? "Setting up your suite..." : "Create Account"}</button>
        </form>
        <p className="mt-10 text-center text-sm font-medium text-warm-brown border-t border-rose pt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-terracotta font-bold hover:text-rosegold transition-colors underline underline-offset-4">Sign In</Link>
        </p>
      </div>
    </div>
  );
}