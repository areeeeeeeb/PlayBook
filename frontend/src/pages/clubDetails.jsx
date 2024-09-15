import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

// This would typically come from an API or database
const clubData = {
  csc: {
    title: "csc",
    id: "csc",
    imgURL:
      "https://media.licdn.com/dms/image/v2/D560BAQEzT7qXPY5mMw/company-logo_200_200/company-logo_200_200/0/1689902647768/uwcsclub_logo?e=2147483647&v=beta&t=qEyNgISeXEO4VG0gPJ9FJ7Nq-FX9oAuCRf4iCQKfCmM",
    bannerURL:
      "https://www.yorkregiontutoring.com/wp-content/uploads/2021/05/University-of-Waterloo-Cheriton-School-Computer-Science-Davis-Centre.jpg",
    description:
      "The Computer Science Club (CSC) is a student-run organization dedicated to fostering a community of tech enthusiasts and promoting computer science education.",
  },
  mathsoc: {
    title: "mathsoc",
    id: "mathsoc",
    imgURL:
      "https://mathsoc.uwaterloo.ca/wp-content/uploads/2020/06/mathsoc-logo.png",
    description:
      "The Mathematics Society (Math Soc) is committed to enriching the academic and social lives of mathematics students through various programs and events.",
  },
};

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
          <div
            className={`text-5xl transition-all duration-150 ${
              isHovered ? "rotate-12" : ""
            }`}
          >
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
          isPopupOpen ? "w-[600px] px-4" : "w-0 p-0"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold  text-white">{title}</h2>
          <button className="text-white" onClick={() => setIsPopupOpen(false)}>
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

const ClubDetails = () => {
  const { clubTitle } = useParams();
  const club = clubData[clubTitle];

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const response = await fetch(`http://127.0.0.1:5000/api/events/${club.id}`);
    const data = await response.json();
    setEvents(data.events);
    console.log(data.events);
  };

  return (
    <div className="space-y-2 text-white">
      <div className="space-y-[-35px]">
        <img
          className="relative z-0 left-0 object-cover w-screen h-32 bg-red-400"
          src={club.bannerURL}
        />
        <div className="relative px-8 z-10 flex z-10 items-end justify-between">
          <img
            src={club.imgURL}
            alt={club.title}
            className="w-20 aspect-square object-contain bg-white rounded-lg mr-4"
          />
          <button className="w-28 border-[1px] text-black bg-white border-white rounded-md">
            Follow
          </button>
        </div>
      </div>

      <div className="px-8">
        <h1 className="text-3xl font-bold">{club.title}</h1>
        <p className="mb-4">{club.description}</p>
        <h2 className="text-2xl mb-2"> Events</h2>
        {
          <ul className="list-disc list-inside">
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
          </ul>
        }
      </div>
    </div>
  );
};

export default ClubDetails;
