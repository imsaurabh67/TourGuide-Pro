import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import MapView from "../components/MapView";
import { useAuth } from "../context/AuthContext";

export default function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/tours/${id}`).then((res) => setTour(res.data));
    api.get(`/reviews/${id}`).then((res) => setReviews(res.data));
  }, [id]);

  if (!tour) return <p className="text-center mt-10 text-slate-400">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="rounded-2xl overflow-hidden shadow-card mb-6">
        <img
          src={tour.images?.[0] || `https://picsum.photos/seed/${tour._id}/900/400`}
          alt={tour.title}
          className="w-full h-64 object-cover"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-card p-6">
        <span className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full capitalize mb-2">
          {tour.category}
        </span>
        <h1 className="font-display text-2xl font-bold text-ink">{tour.title}</h1>
        <p className="text-slate-500 mb-4">📍 {tour.location?.address}</p>
        <p className="text-slate-700 leading-relaxed">{tour.description}</p>

        <div className="flex flex-wrap gap-6 mt-5 text-sm text-slate-600">
          {tour.duration && <span>⏱ {tour.duration}</span>}
          <span>👥 Up to {tour.maxGroupSize} people</span>
          <span className="text-slate-500">Guide: {tour.guideId?.name}</span>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
          <p className="font-display text-2xl font-bold text-brand-600">₹{tour.price}<span className="text-sm font-normal text-slate-400"> /person</span></p>
          {user?.role === "traveler" && (
            <button
              onClick={() => navigate(`/booking/${tour._id}`)}
              className="gradient-brand text-white px-6 py-2.5 rounded-full font-semibold shadow-card"
            >
              Book this tour
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl shadow-card p-4 overflow-hidden">
        <MapView lat={tour.location?.lat} lng={tour.location?.lng} label={tour.title} />
      </div>

      <div className="mt-6 bg-white rounded-2xl shadow-card p-6">
        <h2 className="font-display font-semibold text-lg mb-3 text-ink">Reviews</h2>
        {reviews.length === 0 && <p className="text-slate-400">No reviews yet.</p>}
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r._id} className="border-b border-slate-100 pb-3 last:border-0">
              <p className="font-medium text-ink">{r.userId?.name} <span className="text-amber-500">— {"★".repeat(r.rating)}</span></p>
              <p className="text-sm text-slate-600">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
