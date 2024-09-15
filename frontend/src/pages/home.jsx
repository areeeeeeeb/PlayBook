import React from "react";
import { useState, useEffect } from "react";
import ClubWidget from "../components/ClubWidget";
import EventWidget from "../components/EventWidget";

const allowedUserIds = ['css', 'mathsoc', 'twn', 'student1'];

const clubs = [
  {
    title: "csc",
    imgURL:
      "https://media.licdn.com/dms/image/v2/D560BAQEzT7qXPY5mMw/company-logo_200_200/company-logo_200_200/0/1689902647768/uwcsclub_logo?e=2147483647&v=beta&t=qEyNgISeXEO4VG0gPJ9FJ7Nq-FX9oAuCRf4iCQKfCmM",
  },
  {
    title: "mathsoc",
    imgURL:
      "https://mathsoc.uwaterloo.ca/wp-content/uploads/2020/06/mathsoc-logo.png",
  },
  {
    title: "twn",
    imgURL:
      "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg",
  }
];

const Home = () => {
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
    <div className="p-4 text-white items-center justify-start px-8">
      <h1 className="text-2xl mb-2">ORGS YOU FOLLOW</h1>
      <div className="bg-white w-full h-0.5 mb-4" />
      <div className="flex space-x-5 overflow-x-auto items-center pb-2">
        {clubs.map((club, index) => (
          <ClubWidget key={index} title={club.title} imgURL={club.imgURL} />
        ))}
      </div>

      
      <h1 className="text-2xl mb-1">YOUR EVENTS</h1>
      <div className="bg-white w-full h-0.5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {events
          .filter(event => allowedUserIds.includes(event.user_id))
          .map((event) => (
            <EventWidget
              key={event.id}
              time={event.startTime}
              image={event.image}
              emoji={event.emoji}
              location={event.location}
              title={event.title}
              description={event.description}
              organizer={event.user_id}
            />
          ))}
      </div>
      
    </div>
  );
};

export default Home;
