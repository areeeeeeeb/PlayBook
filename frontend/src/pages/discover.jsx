import { useState, useEffect, useRef } from "react";
import { XIcon } from "lucide-react";
import { Calendar, PinIcon } from "lucide-react";

const EventWidget = ({ time, emoji, title, organizer, location, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);
  // Close popup when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };
    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        ref={popupRef}
        className={`fixed bg-gray-800 right-0 top-16 h-full pt-2 overflow-hidden rounded-l-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isPopupOpen ? 'w-[600px] px-4' : 'w-0 p-0'
        }`}
      >
        <button
          className="items-end justify-end w-full text-white"
          onClick={() => setIsPopupOpen(false)}
        >
          <div className="flex justify-end">
            <XIcon />
          </div>
        </button>
        
        <div className="space-y-[-30px]">
          <div className="w-full h-40 bg-red-400 rounded-lg"/>
          <div className="flex space-x-[10px] items-baseline">
            <div className="pl-2 text-7xl">{emoji}</div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-md text-white">
              Hosted by <span className="hover:underline cursor-pointer">{organizer}</span>
            </p>
          </div>
        </div>
        
        <div className="text-md flex space-x-1 mt-2 text-white">
          <Calendar className="w-5"/>
          <text> {time}</text>
        </div>

        <div className="text-md flex space-x-1 mt-2 text-white">
          <PinIcon className="w-5"/>
          <text> {location}</text>
        </div>

        <text className="text-white/70 text-sm">About Event</text>
        <div className="w-full h-0.5 rounded-lg bg-white/50"/>
        <p className="text-md text-white">{description}</p>
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
            location={event.location}
            title={event.title}
            description={event.description}
            organizer={event.organizer}
          />
        ))}
      </div>
    </div>
  );
}