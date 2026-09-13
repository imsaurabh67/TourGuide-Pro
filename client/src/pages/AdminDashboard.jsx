import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    api.get("/tours").then((res) => setTours(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-500 mb-4">Total tours: {tours.length}</p>
      <ul>
        {tours.map((t) => (
          <li key={t._id} className="border-b py-2">
            {t.title} — {t.guideId?.name} — ₹{t.price}
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-400 mt-4">
        Extend this page with guide-verification and user-ban endpoints as needed.
      </p>
    </div>
  );
}
