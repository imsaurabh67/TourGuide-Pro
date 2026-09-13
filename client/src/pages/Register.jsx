import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "traveler" });
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password, form.role);
      navigate("/");
    } catch (err) {
      showToast(err.response?.data?.message || "Registration failed", "error");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-card">
        <h2 className="font-display text-2xl font-bold text-ink mb-1">Create your account</h2>
        <p className="text-sm text-slate-500 mb-6">Join as a traveler or a local guide.</p>

        <input name="name" placeholder="Full name" onChange={handleChange}
          className="border border-slate-200 w-full p-2.5 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-brand-400" />
        <input name="email" placeholder="Email" onChange={handleChange}
          className="border border-slate-200 w-full p-2.5 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-brand-400" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange}
          className="border border-slate-200 w-full p-2.5 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-brand-400" />

        <div className="flex gap-3 mb-6">
          {["traveler", "guide"].map((r) => (
            <label key={r} className={`flex-1 border rounded-lg p-2.5 text-center text-sm cursor-pointer capitalize ${
              form.role === r ? "border-brand-500 bg-brand-50 text-brand-700 font-semibold" : "border-slate-200 text-slate-500"
            }`}>
              <input type="radio" name="role" value={r} checked={form.role === r} onChange={handleChange} className="hidden" />
              {r}
            </label>
          ))}
        </div>

        <button className="gradient-brand text-white w-full py-2.5 rounded-lg font-semibold">Sign Up</button>
        <p className="text-sm text-slate-500 text-center mt-4">
          Already have an account? <Link to="/login" className="text-brand-600 font-medium">Login</Link>
        </p>
      </form>
    </div>
  );
}
