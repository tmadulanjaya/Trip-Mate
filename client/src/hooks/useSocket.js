import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export function useSocket(tripId, onItineraryUpdated) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!tripId) return;

    const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000");
    socketRef.current = socket;

    socket.emit("join-trip", tripId);

    socket.on("itinerary-updated", (updatedItem) => {
      onItineraryUpdated?.(updatedItem);
    });

    return () => {
      socket.emit("leave-trip", tripId);
      socket.disconnect();
    };
  }, [tripId]);

  return socketRef.current;
}
