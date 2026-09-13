import Review from "../models/Review.js";
import Tour from "../models/Tour.js";
import User from "../models/User.js";

export const createReview = async (req, res) => {
  try {
    const { tourId, rating, comment } = req.body;
    const review = await Review.create({ tourId, userId: req.user.id, rating, comment });

    // recompute guide's average rating
    const tour = await Tour.findById(tourId);
    const reviews = await Review.find({ tourId });
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    await User.findByIdAndUpdate(tour.guideId, { ratingAvg: avg });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTourReviews = async (req, res) => {
  const reviews = await Review.find({ tourId: req.params.tourId }).populate("userId", "name avatar");
  res.json(reviews);
};
