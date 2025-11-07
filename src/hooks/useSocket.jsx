import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function useSocket({
  url = "http://localhost:3000",
  token = null,
}) {
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    socketRef.current = io(url, {
      autoConnect: true,
      auth: { token },
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelayMax: 5000,
    });

    const socket = socketRef.current;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("connect_error", (err) =>
      console.error("socket connection error", err)
    );
    return () => {
      socket.disconnect();
    };
  }, [url, token]);

  const emit = (event, payload, ack) => {
    socketRef.current?.emit(event, payload, ack);
  };

  const on = (event, handler) => {
    socketRef.current?.on(event, handler);
    return () => socketRef.current?.off(event, handler);
  };

  return { connected, emit, on };
}
