import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TourDetails from "./pages/TourDetails";
import Booking from "./pages/Booking";
import Chat from "./pages/Chat";
import GuideDashboard from "./pages/GuideDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MyBookings from "./pages/MyBookings";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/booking/:tourId" element={<Booking />} />
        <Route path="/chat/:bookingId" element={<Chat />} />
        <Route path="/guide/dashboard" element={<GuideDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </div>
  );
}
