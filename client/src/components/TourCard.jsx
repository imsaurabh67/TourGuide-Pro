import { Link } from "react-router-dom";

export default function TourCard({ tour }) {
  return (
    <Link
      to={`/tours/${tour._id}`}
      className="card-hover block rounded-2xl overflow-hidden shadow-card hover:shadow-cardHover bg-white border border-slate-100"
    >
      <div className="relative">
        <img
          src={tour.images?.[0] || `https://picsum.photos/seed/${tour._id}/500/300`}
          alt={tour.title}
          className="w-full h-44 object-cover"
        />
        <span className="absolute top-3 left-3 bg-white/90 text-xs font-semibold px-2 py-1 rounded-full capitalize text-brand-700">
          {tour.category || "general"}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display font-semibold text-lg text-ink truncate">{tour.title}</h3>
        <p className="text-sm text-slate-500 truncate">📍 {tour.location?.address || "Location TBD"}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-brand-600">₹{tour.price}<span className="text-xs text-slate-400 font-normal"> /person</span></span>
          <span className="text-sm text-amber-500 font-medium">
            ★ {tour.guideId?.ratingAvg ? tour.guideId.ratingAvg.toFixed(1) : "New"}
          </span>
        </div>
      </div>
    </Link>
  );
}
