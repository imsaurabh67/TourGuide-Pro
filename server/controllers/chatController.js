import Message from "../models/Message.js";

export const getChatHistory = async (req, res) => {
  const { bookingId } = req.params;
  const messages = await Message.find({ bookingId }).sort("createdAt");
  res.json(messages);
};
