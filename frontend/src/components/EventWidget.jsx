import { useState, useEffect, useRef } from "react";
import { XIcon } from "lucide-react";
import { Calendar, PinIcon } from "lucide-react";

const EventWidget = ({ time, emoji, image, title, organizer, location, description }) => {
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
        <div 
            className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
                isPopupOpen ? 'opacity-50 z-10' : 'opacity-0 -z-10'
            }`} 
        />

      <div
        className="justify-center hide-overflow text-white rounded-xl cursor-pointer hover:bg-white/10 items-center gap-2 p-2 inline-flex"
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
          <div className="text-white/40 text-xs font-normal">@{organizer}</div>
        </div>
      </div>

      <div
        ref={popupRef}
        className={`fixed  bg-gray-800 z-20 right-0 top-16 h-full pt-2 overflow-hidden rounded-l-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isPopupOpen ? 'sm:w-3/4 md:w-1/2 lg:w-[38%] px-4' : 'w-0 p-0'
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
          <img className="w-full h-40 bg-red-400 rounded-lg" src={image}/>
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

export default EventWidget;