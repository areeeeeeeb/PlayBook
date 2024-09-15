import { useState, useEffect } from "react";
import EventWidget from "../components/EventWidget";
import ClubWidget from "../components/ClubWidget";

export default function Discover() {

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
      title: "ackse",
      imgURL:
        "https://images.squarespace-cdn.com/content/v1/5ea4d3f4c5cdad5a2eb79812/1690156091074-1XHBYYT7RHWV7KUURQMJ/AKCSE+Logo.png",
    },
    {
      title: "uwpc",
      imgURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQTwQVIUbht1F-p_1VELnSUG2t8o1tknBHBQ&s",
    },
    {
      title: "twn",
      imgURL:
        "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg",
    },
    {
      title: "deca",
      imgURL:
        "https://nmctso.com/wp-content/uploads/2022/07/DECA-Logo-Stack-Blue.jpeg",
    },
    {
      title: "watsam",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
    },
    {
      title: "wistem",
      imgURL:
        "https://thegreattransition.github.io/group062-19RNrT/assets/images/logo.jpg",
    },
    {
      title: "ostem",
      imgURL:
        "https://ostemnorthtexas.github.io/site/assets/img/oSTEM-UNT-avatar-wbg.png",
    },
  ];

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
    
    <div className="p-4 px-8 text-white items-center bg-black justify-start hide-overflow">
      <div className="text-white items-center justify-start pb-2">
        <h1 className="text-2xl mb-2">ORGS</h1>
        <div className="bg-white w-full h-0.5 mb-4" />
          <div className="flex space-x-5 overflow-x-auto items-center">
            {clubs.map((club, index) => (
              <ClubWidget key={index} title={club.title} imgURL={club.imgURL} />
            ))}
          </div>
      </div>
      
      <h1 className="text-2xl mb-1">EVENTS</h1>
      <div className="bg-white w-full h-0.5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {events.map((event) => (
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
}