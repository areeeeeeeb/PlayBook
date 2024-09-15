import { useState, useEffect } from "react";

const EventWidget = ({ time, emoji, title, organizer, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <>
        <div
            className="justify-center max-w-xs hide-overflow text-white rounded-xl cursor-pointer hover:bg-white/10 items-center gap-2 p-2 inline-flex"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsPopupOpen(true)}
        >
            <div className="flex-col justify-start items-center inline-flex">
            <div className={`text-5xl transition-all duration-150 ${isHovered ? 'rotate-12' : ''}`}>
                {emoji}
            </div>
            </div>
            <div className="grow shrink flex-col justify-center items-left inline-flex">
                    <div className="text-lg font-bold">{title.toUpperCase()}</div>
                    <div className="text-sm">{time}</div>
                    <div className="text-white/40 text-xs font-normal">{organizer}</div>
            </div>
        </div>

        <div
            className={`fixed bg-gray-800 right-0 top-16 h-full space-y-2 pt-4 rounded-l-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
                isPopupOpen ? 'w-[600px] px-4' : 'w-0 p-0'
            }`}
        >   
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold  text-white">{title}</h2>
                <button
                    className="text-white"
                    onClick={() => setIsPopupOpen(false)}
                    >
                ×
                </button>
            </div>
            <p className="text-lg mb-2 text-white">{time}</p>
            <p className="text-xl mb-4 text-white">{description}</p>
            <p className="text-sm text-white/40">{organizer}</p>
        </div>
    </>
  );
};


export default function Discover() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const response = await fetch("http://127.0.0.1:5000/api/events/");
        const data = await response.json();
        setEvents(data.events);
    };

  return (
    <div className="p-4 text-white items-center justify-start hide-overflow">
      <h1 className="text-3xl mb-4">EVENTS</h1>
      <div className="rounded-xl">
        {events.map((event, index) => (
          <EventWidget
            key={event.id}
            time={event.time}
            emoji={event.emoji}
            title={event.title}
            description={event.description}
            organizer={event.user_id}
          />
        ))}
      </div>
    </div>
  );
}