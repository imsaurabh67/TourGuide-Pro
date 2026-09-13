import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      showToast(err.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-card">
        <h2 className="font-display text-2xl font-bold text-ink mb-1">Welcome back</h2>
        <p className="text-sm text-slate-500 mb-6">Log in to continue exploring tours.</p>

        <label className="text-sm font-medium text-slate-600">Email</label>
        <input className="border border-slate-200 w-full p-2.5 mt-1 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-brand-400"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="text-sm font-medium text-slate-600">Password</label>
        <input className="border border-slate-200 w-full p-2.5 mt-1 mb-6 rounded-lg outline-none focus:ring-2 focus:ring-brand-400"
          type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="gradient-brand text-white w-full py-2.5 rounded-lg font-semibold">Login</button>
        <p className="text-sm text-slate-500 text-center mt-4">
          No account? <Link to="/register" className="text-brand-600 font-medium">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
