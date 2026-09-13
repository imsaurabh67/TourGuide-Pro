import Message from "../models/Message.js";

const onlineUsers = new Map(); // userId -> socketId

export const initSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("identify", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("joinBooking", (bookingId) => {
      socket.join(bookingId);
    });

    socket.on("sendMessage", async ({ bookingId, senderId, receiverId, text }) => {
      const message = await Message.create({ bookingId, senderId, receiverId, text });
      io.to(bookingId).emit("newMessage", message);
    });

    socket.on("disconnect", () => {
      for (const [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) onlineUsers.delete(userId);
      }
    });
  });
};
