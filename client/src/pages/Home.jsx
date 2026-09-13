import { useEffect, useState } from "react";
import api from "../api/axios";
import TourCard from "../components/TourCard";

const CATEGORIES = ["all", "heritage", "adventure", "food", "nature", "city", "general"];

export default function Home() {
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchTours = async () => {
    setLoading(true);
    const { data } = await api.get("/tours", {
      params: { search, category: category === "all" ? undefined : category }
    });
    setTours(data);
    setLoading(false);
  };

  useEffect(() => { fetchTours(); }, [category]);

  return (
    <div>
      {/* Hero */}
      <div className="gradient-brand text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold mb-3">
            Discover tours led by real local guides
          </h1>
          <p className="text-brand-50/90 max-w-xl mx-auto mb-8">
            Browse curated experiences, chat directly with your guide, and book securely — all in one place.
          </p>
          <div className="max-w-xl mx-auto flex gap-2 bg-white rounded-full p-1.5 shadow-cardHover">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchTours()}
              placeholder="Search destinations, tours, cities..."
              className="flex-1 px-4 py-2 rounded-full text-ink outline-none"
            />
            <button
              onClick={fetchTours}
              className="gradient-brand text-white px-6 py-2 rounded-full font-semibold"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-6">
        {/* Category chips */}
        <div className="flex gap-2 flex-wrap mb-8 bg-white shadow-card rounded-xl p-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition ${
                category === c
                  ? "gradient-brand text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pb-16">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pb-16">
            {tours.map((t) => <TourCard key={t._id} tour={t} />)}
            {tours.length === 0 && (
              <p className="text-slate-400 col-span-full text-center py-10">
                No tours found. Try a different search or category.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
