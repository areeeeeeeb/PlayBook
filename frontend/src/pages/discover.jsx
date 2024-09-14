import { useState } from "react";

const EventWidget = ({ time, emoji, title, organizer, headline }) => {
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
            <p className="text-xl mb-4 text-white">{headline}</p>
            <p className="text-sm text-white/40">{organizer}</p>
        </div>
    </>
  );
};

const events = [
  {
    time: "Fri, 20 Sept, 10:00 pm",
    emoji: "🍕",
    title: "Pizza Party!",
    headline: "Join us for free pizza in the Student Center!",
    organizer: "@StudentUnion",
  },
  {
    time: "Sun, 3 Nov, 8:00 pm",
    emoji: "🎸",
    title: "Guitar Workshop",
    headline: "Learn to play guitar with our expert instructor!",
    organizer: "@MusicClub",
  },
  {
    time: "Fri, 29 Nov, 7:00 pm",
    emoji: "⚽️",
    title: "Soccer Game",
    headline: "Cheer on our team as they take on the rivals!",
    organizer: "@SportsTeam",
  },
  {
    time: "Sat, 14 Sept, 10:00 pm",
    emoji: "🎭",
    title: "Theater Performance",
    headline: "Enjoy a night of live theater in the Drama Building!",
    organizer: "@DramaDepartment",
  },
  {
    time: "Sat, 5 Oct, 10:00 pm",
    emoji: "🎥",
    title: "Movie Night",
    headline: "Relax and watch a movie with friends in the Film Lounge!",
    organizer: "@FilmSociety",
  },
];

export default function Discover() {
  return (
    <div className="p-4 text-white items-center justify-start hide-overflow">
      <h1 className="text-3xl mb-4">EVENTS</h1>
      <div className="rounded-xl">
        {events.map((event, index) => (
          <EventWidget
            key={index}
            time={event.time}
            emoji={event.emoji}
            title={event.title}
            headline={event.headline}
            organizer={event.organizer}
          />
        ))}
      </div>
    </div>
  );
}