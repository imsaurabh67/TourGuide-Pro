import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const useSocket = (userId) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
    socketRef.current = io(socketUrl);
    if (userId) socketRef.current.emit("identify", userId);

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId]);

  return socketRef;
};
