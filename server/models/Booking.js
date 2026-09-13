import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    touristId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
    guideId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    groupSize: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending"
    },
    paymentId: { type: String, default: "" },
    amount: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
