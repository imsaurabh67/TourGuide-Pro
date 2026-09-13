import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    guideId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      address: String,
      lat: Number,
      lng: Number
    },
    price: { type: Number, required: true },
    duration: { type: String },
    maxGroupSize: { type: Number, default: 6 },
    images: [{ type: String }],
    category: { type: String, default: "general" },
    availability: [{ type: Date }]
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
