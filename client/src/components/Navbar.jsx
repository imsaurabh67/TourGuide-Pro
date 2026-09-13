import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`text-sm font-medium transition ${
        location.pathname === to ? "text-brand-600" : "text-slate-600 hover:text-brand-600"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-xl">
          <span className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white text-sm">
            TG
          </span>
          <span className="text-ink">TourGuide<span className="text-brand-600">Pro</span></span>
        </Link>

        <div className="hidden sm:flex gap-6 items-center">
          {navLink("/", "Explore")}
          {user?.role === "traveler" && navLink("/my-bookings", "My Bookings")}
          {user?.role === "guide" && navLink("/guide/dashboard", "Guide Dashboard")}
          {user?.role === "admin" && navLink("/admin/dashboard", "Admin")}
        </div>

        <div className="flex gap-3 items-center">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-slate-500">Hi, {user.name?.split(" ")[0]}</span>
              <button
                onClick={() => { logout(); navigate("/login"); }}
                className="px-4 py-1.5 rounded-full border border-slate-200 text-sm font-medium hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-brand-600">
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 rounded-full gradient-brand text-white text-sm font-semibold shadow-card"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
