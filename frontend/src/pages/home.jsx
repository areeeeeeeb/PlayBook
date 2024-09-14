const EventWidget = ({ time, emoji, title, headline, organizer }) => {
    return (
      <div className="justify-center max-w-xs text-white rounded-xl hover:bg-white/10 items-center gap-2 p-2 inline-flex">
        <div className="flex-col justify-start items-center inline-flex">
            <div className="text-lg">{time}</div>
            <div className="text-5xl transition-all duration-150 hover:rotate-12">
                {emoji}
            </div>
        </div>        
        <div className="grow shrink flex-col justify-center items-left inline-flex">
            <div className="text-lg font-bold">{title.toUpperCase()}</div>
            <div className="text-sm">{headline}</div>
            <div className="text-white/40 text-xs font-normal">{organizer}</div>
        </div>
      </div>
    );
};

const events = [
    {
      time: "12PM",
      emoji: "🍕",
      title: "Pizza Party!",
      headline: "Join us for free pizza in the Student Center!",
      organizer: "@StudentUnion",
    },
    {
      time: "2PM",
      emoji: "🎸",
      title: "Guitar Workshop",
      headline: "Learn to play guitar with our expert instructor!",
      organizer: "@MusicClub",
    },
    {
      time: "4PM",
      emoji: "⚽️",
      title: "Soccer Game",
      headline: "Cheer on our team as they take on the rivals!",
      organizer: "@SportsTeam",
    },
    {
      time: "6PM",
      emoji: "🎭",
      title: "Theater Performance",
      headline: "Enjoy a night of live theater in the Drama Building!",
      organizer: "@DramaDepartment",
    },
    {
      time: "8PM",
      emoji: "🎥",
      title: "Movie Night",
      headline: "Relax and watch a movie with friends in the Film Lounge!",
      organizer: "@FilmSociety",
    },
];

export default function Home() {

    return (
        
        <div className="p-4 text-white items-center justify-start">
            <text className="text-3xl"> EVENTS </text>

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
        
    )
}