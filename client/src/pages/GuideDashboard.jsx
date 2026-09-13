import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const emptyForm = {
  title: "", description: "", price: "", category: "general",
  duration: "", maxGroupSize: 6, address: "", lat: "", lng: "", imageUrl: ""
};

export default function GuideDashboard() {
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { showToast } = useToast();

  const loadData = async () => {
    const [t, b] = await Promise.all([
      api.get("/tours/mine"),
      api.get("/bookings/guide")
    ]);
    setTours(t.data);
    setBookings(b.data);
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const startEdit = (tour) => {
    setEditingId(tour._id);
    setForm({
      title: tour.title,
      description: tour.description,
      price: tour.price,
      category: tour.category,
      duration: tour.duration || "",
      maxGroupSize: tour.maxGroupSize || 6,
      address: tour.location?.address || "",
      lat: tour.location?.lat || "",
      lng: tour.location?.lng || "",
      imageUrl: tour.images?.[0] || ""
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      duration: form.duration,
      maxGroupSize: Number(form.maxGroupSize),
      images: form.imageUrl ? [form.imageUrl] : [],
      location: { address: form.address, lat: Number(form.lat), lng: Number(form.lng) }
    };
    try {
      if (editingId) {
        await api.put(`/tours/${editingId}`, payload);
        showToast("Tour updated");
      } else {
        await api.post("/tours", payload);
        showToast("Tour created");
      }
      resetForm();
      loadData();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to save tour", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tour? This can't be undone.")) return;
    try {
      await api.delete(`/tours/${id}`);
      showToast("Tour deleted");
      loadData();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to delete tour", "error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Guide Dashboard</h1>
        <button
          onClick={() => { showForm ? resetForm() : setShowForm(true); }}
          className="gradient-brand text-white px-5 py-2 rounded-full font-semibold text-sm shadow-card"
        >
          {showForm ? "Close" : "+ New Tour"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-card mb-8 grid grid-cols-2 gap-4">
          <h2 className="col-span-2 font-display font-semibold text-lg text-ink">
            {editingId ? "Edit Tour Package" : "Create New Tour Package"}
          </h2>
          <input name="title" placeholder="Tour title" value={form.title} onChange={handleChange}
            className="border border-slate-200 p-2.5 rounded-lg col-span-2 outline-none focus:ring-2 focus:ring-brand-400" required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}
            className="border border-slate-200 p-2.5 rounded-lg col-span-2 outline-none focus:ring-2 focus:ring-brand-400" rows={3} required />
          <input name="price" type="number" placeholder="Price (₹)" value={form.price} onChange={handleChange}
            className="border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-brand-400" required />
          <select name="category" value={form.category} onChange={handleChange}
            className="border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-brand-400">
            <option value="general">General</option>
            <option value="heritage">Heritage</option>
            <option value="adventure">Adventure</option>
            <option value="food">Food</option>
            <option value="nature">Nature</option>
            <option value="city">City</option>
          </select>
          <input name="duration" placeholder="Duration (e.g. 3 hours)" value={form.duration} onChange={handleChange}
            className="border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-brand-400" />
          <input name="maxGroupSize" type="number" placeholder="Max group size" value={form.maxGroupSize} onChange={handleChange}
            className="border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-brand-400" />
          <input name="imageUrl" placeholder="Cover image URL" value={form.imageUrl} onChange={handleChange}
            className="border border-slate-200 p-2.5 rounded-lg col-span-2 outline-none focus:ring-2 focus:ring-brand-400" />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange}
            className="border border-slate-200 p-2.5 rounded-lg col-span-2 outline-none focus:ring-2 focus:ring-brand-400" required />
          <input name="lat" placeholder="Latitude" value={form.lat} onChange={handleChange}
            className="border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-brand-400" required />
          <input name="lng" placeholder="Longitude" value={form.lng} onChange={handleChange}
            className="border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-brand-400" required />

          <div className="col-span-2 flex gap-3">
            <button className="gradient-brand text-white px-6 py-2.5 rounded-lg font-semibold flex-1">
              {editingId ? "Save Changes" : "Create Tour"}
            </button>
            <button type="button" onClick={resetForm} className="px-6 py-2.5 rounded-lg border border-slate-200 font-medium">
              Cancel
            </button>
          </div>
        </form>
      )}

      <h2 className="font-display font-semibold text-lg mb-3 text-ink">My Tour Packages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {tours.map((t) => (
          <div key={t._id} className="bg-white rounded-xl shadow-card p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-ink">{t.title}</p>
                <p className="text-sm text-slate-500 capitalize">{t.category} • ₹{t.price}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(t)} className="text-brand-600 text-sm font-medium hover:underline">
                  Edit
                </button>
                <button onClick={() => handleDelete(t._id)} className="text-red-500 text-sm font-medium hover:underline">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {tours.length === 0 && <p className="text-slate-400">No tours yet — create your first one above.</p>}
      </div>

      <h2 className="font-display font-semibold text-lg mb-3 text-ink">Bookings</h2>
      <div className="space-y-2">
        {bookings.map((b) => (
          <div key={b._id} className="bg-white rounded-xl shadow-card p-4 flex justify-between items-center">
            <span className="text-sm text-ink">
              {b.tourId?.title} — {b.touristId?.name} — <span className="capitalize text-slate-500">{b.status}</span>
            </span>
            <Link to={`/chat/${b._id}`} className="text-brand-600 text-sm font-medium">Chat →</Link>
          </div>
        ))}
        {bookings.length === 0 && <p className="text-slate-400">No bookings yet.</p>}
      </div>
    </div>
  );
}
