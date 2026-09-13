import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const statusColor = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  completed: "bg-slate-100 text-slate-600",
  cancelled: "bg-red-100 text-red-700"
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/bookings/my").then((res) => {
      setBookings(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="font-display text-2xl font-bold mb-6 text-ink">My Bookings</h1>

      {loading && <p className="text-slate-400">Loading...</p>}
      {!loading && bookings.length === 0 && (
        <p className="text-slate-400">You haven't booked any tours yet — go explore!</p>
      )}

      <div className="space-y-3">
        {bookings.map((b) => (
          <div key={b._id} className="bg-white rounded-xl shadow-card p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-ink">{b.tourId?.title}</p>
              <p className="text-sm text-slate-500">
                Guide: {b.guideId?.name} • {new Date(b.date).toLocaleDateString()} • ₹{b.amount}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColor[b.status]}`}>
                {b.status}
              </span>
              {b.status === "confirmed" && (
                <Link to={`/chat/${b._id}`} className="text-brand-600 text-sm font-medium">
                  Chat →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
