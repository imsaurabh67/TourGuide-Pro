import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useToast } from "../context/ToastContext";

// NOTE: Payment is temporarily mocked (Razorpay keys not set up yet).
// Booking is created and instantly confirmed without a real checkout popup.
// See server/controllers/bookingController.js for the commented-out real version.

export default function Booking() {
  const { tourId } = useParams();
  const [date, setDate] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [paying, setPaying] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleBook = async () => {
    if (!date) {
      showToast("Please pick a date first", "error");
      return;
    }
    setPaying(true);
    try {
      const { data: booking } = await api.post("/bookings", { tourId, date, groupSize });

      // Mock payment step — instantly "confirms" the booking.
      await api.post(`/bookings/${booking._id}/confirm-payment`, {
        razorpay_payment_id: "mock_payment"
      });

      showToast("Booking confirmed! 🎉 (test mode — no real payment taken)");
      navigate("/my-bookings");
    } catch (err) {
      showToast(err.response?.data?.message || "Something went wrong", "error");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-card">
      <h2 className="font-display text-xl font-bold mb-1 text-ink">Book this tour</h2>
      <p className="text-sm text-slate-500 mb-6">Pick a date and confirm your spot.</p>

      <div className="bg-amber-50 text-amber-700 text-xs font-medium px-3 py-2 rounded-lg mb-4">
        ⚠️ Test mode: payment is mocked right now, no real charge happens.
      </div>

      <label className="block mb-1 text-sm font-medium text-slate-600">Date</label>
      <input
        type="date"
        className="border border-slate-200 w-full p-2.5 mb-4 rounded-lg focus:ring-2 focus:ring-brand-400 outline-none"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label className="block mb-1 text-sm font-medium text-slate-600">Group size</label>
      <input
        type="number"
        min="1"
        className="border border-slate-200 w-full p-2.5 mb-6 rounded-lg focus:ring-2 focus:ring-brand-400 outline-none"
        value={groupSize}
        onChange={(e) => setGroupSize(e.target.value)}
      />

      <button
        onClick={handleBook}
        disabled={paying}
        className="gradient-brand text-white w-full py-3 rounded-lg font-semibold disabled:opacity-60"
      >
        {paying ? "Processing..." : "Confirm Booking"}
      </button>
    </div>
  );
}
