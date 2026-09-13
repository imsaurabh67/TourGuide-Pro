import crypto from "crypto";
import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";

// ============================================================
// PAYMENT IS TEMPORARILY MOCKED (Razorpay keys not set up yet).
// The real Razorpay integration is kept below, commented out.
// To re-enable: uncomment the Razorpay block, remove the mock
// createOrder/confirmPayment functions, and set RAZORPAY_KEY_ID /
// RAZORPAY_KEY_SECRET in server/.env
// ============================================================

// import Razorpay from "razorpay";
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

export const createBooking = async (req, res) => {
  try {
    const { tourId, date, groupSize } = req.body;
    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    const amount = tour.price * (groupSize || 1);

    const booking = await Booking.create({
      touristId: req.user.id,
      tourId,
      guideId: tour.guideId,
      date,
      groupSize,
      amount
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ touristId: req.user.id })
    .populate("tourId", "title price images")
    .populate("guideId", "name")
    .sort("-createdAt");
  res.json(bookings);
};

export const getGuideBookings = async (req, res) => {
  const bookings = await Booking.find({ guideId: req.user.id })
    .populate("tourId", "title price")
    .populate("touristId", "name email")
    .sort("-createdAt");
  res.json(bookings);
};

export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const isGuide = booking.guideId.toString() === req.user.id;
    const isTourist = booking.touristId.toString() === req.user.id;
    if (!isGuide && !isTourist) return res.status(403).json({ message: "Forbidden" });

    booking.status = req.body.status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- MOCK PAYMENT (temporary) ---
// No real order is created — frontend just calls confirm-payment directly.
export const createOrder = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.touristId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    // Mock order object shaped like Razorpay's response so the frontend doesn't break.
    res.json({
      orderId: `mock_order_${Date.now()}`,
      amount: Math.round(booking.amount * 100),
      currency: "INR",
      keyId: "mock",
      mock: true
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Skips real signature verification while payments are mocked.
    booking.paymentId = req.body.razorpay_payment_id || `mock_${Date.now()}`;
    booking.status = "confirmed";
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---- REAL RAZORPAY VERSION (re-enable later) ----

export const createOrder = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.touristId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const order = await razorpay.orders.create({
      amount: Math.round(booking.amount * 100),
      currency: "INR",
      receipt: `booking_${booking._id}`
    });
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    booking.paymentId = razorpay_payment_id;
    booking.status = "confirmed";
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

*/
