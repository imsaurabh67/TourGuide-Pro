import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../hooks/useSocket";

export default function Chat() {
  const { bookingId } = useParams();
  const { user } = useAuth();
  const socketRef = useSocket(user?.id);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [receiverId, setReceiverId] = useState("");

  useEffect(() => {
    api.get(`/chat/${bookingId}`).then((res) => setMessages(res.data));
  }, [bookingId]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit("joinBooking", bookingId);
    socket.on("newMessage", (msg) => setMessages((prev) => [...prev, msg]));
    return () => socket.off("newMessage");
  }, [socketRef, bookingId]);

  const sendMessage = () => {
    if (!text.trim()) return;
    socketRef.current.emit("sendMessage", {
      bookingId,
      senderId: user.id,
      receiverId,
      text
    });
    setText("");
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded shadow flex flex-col h-[500px]">
      <h2 className="font-bold mb-2">Chat</h2>
      <input
        className="border p-1 mb-2 text-sm rounded"
        placeholder="Receiver user ID (guide/traveler)"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />
      <div className="flex-1 overflow-y-auto space-y-2 mb-2">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`p-2 rounded max-w-[75%] ${
              m.senderId === user.id ? "bg-teal-100 ml-auto" : "bg-gray-100"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border flex-1 p-2 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-teal-600 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
