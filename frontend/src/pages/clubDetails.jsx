import React from "react";
import EventWidget from "../components/EventWidget";
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
  ackse: {
    title: "ackse",
    id: "ackse",
    imgURL:
      "https://images.squarespace-cdn.com/content/v1/5ea4d3f4c5cdad5a2eb79812/1690156091074-1XHBYYT7RHWV7KUURQMJ/AKCSE+Logo.png",
    description:
      "The Association of Korean-Canadian Scientists and Engineers (AKCSE) is a non-profit organization that aims to promote networking and collaboration among Korean-Canadian professionals in STEM.",
  },
  uwpc: {
    title: "uwpc",
    id: "uwpc",
    imgURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQTwQVIUbht1F-p_1VELnSUG2t8o1tknBHBQ&s",
    description:
      "The University of Waterloo Photography Club (UWPC) is a student organization that aims to bring together photography enthusiasts and provide opportunities to develop their skills.",
  },
  twn: {
    title: "twn",
    id: "twn",
    imgURL:
      "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg",
    description:
      "The Tabby Welfare Network (TWN) is a student-run organization that provides resources and support for tabby cats in need.",
  },
  deca: {
    title: "deca",
    id: "deca",
    imgURL:
      "https://nmctso.com/wp-content/uploads/2022/07/DECA-Logo-Stack-Blue.jpeg",
    description:
      "DECA U Waterloo is a student organization that prepares emerging leaders and entrepreneurs for careers in marketing, finance, hospitality, and management.",
  },
  watsam: {
    title: "watsam",
    id: "watsam",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
    description:
      "The Waterloo Student Animal Management (WATSAM) club is dedicated to promoting responsible pet ownership and animal welfare.",
  },
  wistem: {
    title: "wistem",
    id: "wistem",
    imgURL:
      "https://thegreattransition.github.io/group062-19RNrT/assets/images/logo.jpg",
    description:
      "WiSTEM (Women in Science, Technology, Engineering, and Math) was founded in Spring 2013 by UW students who want to promote equality in STEM disciplines.",
  },
  ostem: {
    title: "ostem",
    id: "ostem",
    imgURL:
      "https://ostemnorthtexas.github.io/site/assets/img/oSTEM-UNT-avatar-wbg.png",
    description:
      "Out in Science, Technology, Engineering, and Mathematics (oSTEM) is a student organization that aims to empower LGBTQ+ people in STEM fields.",
  },
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
        <div className="relative px-8 z-10 flex z-0 items-end justify-between">
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
                time={event.startTime}
                location={event.location}
                emoji={event.emoji}
                image={event.image}
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
