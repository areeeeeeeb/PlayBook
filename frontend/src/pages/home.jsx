import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventList from "./eventList";

export default function Home() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const response = await fetch("http://127.0.0.1:5000/api/events");
    const data = await response.json();
    setEvents(data.events);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <EventList events={events} />
      <button
        type="submit"
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        onClick={() => navigate("/create")}
      >
        Create
      </button>
    </div>
  );
}
