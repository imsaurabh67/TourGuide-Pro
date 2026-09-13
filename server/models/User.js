import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["traveler", "guide", "admin"], default: "traveler" },
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    languages: [{ type: String }],
    ratingAvg: { type: Number, default: 0 },
    verified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
