import Tour from "../models/Tour.js";

export const createTour = async (req, res) => {
  try {
    const tour = await Tour.create({ ...req.body, guideId: req.user.id });
    res.status(201).json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTours = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) filter.title = { $regex: search, $options: "i" };

    const tours = await Tour.find(filter).populate("guideId", "name avatar ratingAvg");
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate("guideId", "name avatar bio ratingAvg");
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    if (tour.guideId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your tour" });
    }
    Object.assign(tour, req.body);
    await tour.save();
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    if (tour.guideId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your tour" });
    }
    await tour.deleteOne();
    res.json({ message: "Tour deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyTours = async (req, res) => {
  const tours = await Tour.find({ guideId: req.user.id });
  res.json(tours);
};
