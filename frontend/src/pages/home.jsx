import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ClubWidget = ({ title, imgURL }) => {
  return (
    <Link to={`/club/${encodeURIComponent(title)}`} className="block">
      <div className="text-center">
        <img
          className="w-32 object-fill bg-white aspect-square rounded-lg mx-auto"
          src={imgURL}
          alt={title}
        />
        <p className="mt-2 text-white">{title}</p>
      </div>
    </Link>
  );
};

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
      "https://www.akcse.ca/img/home/common/visual.jpg",
  },
  {
    title: "uwpc",
    imgURL:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dcat&psig=AOvVaw1lU0tvKSBLuqRG0pI58C_p&ust=1726477369268000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNCl_ZLMxIgDFQAAAAAdAAAAABAE",
  },
  {
    title: "twn",
    imgURL:
      "https://pixabay.com/photos/european-shorthair-cat-animal-8601492/",
  },
  {
    title: "deca",
    imgURL:
        "https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg",
  },
  {
    title: "watsam",
    imgURL:
        "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg",
  },
  {
    title: "wistem",
    imgURL:
        "https://media.istockphoto.com/id/1443562748/photo/cute-ginger-cat.jpg?s=612x612&w=0&k=20&c=vvM97wWz-hMj7DLzfpYRmY2VswTqcFEKkC437hxm3Cg=",
  },
  {
    title: "ostem",
    imgURL:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
      
  },

];

const Home = () => {
  return (
    <div className="p-4 text-white items-center justify-start px-8">
      <h1 className="text-3xl mb-2">CLUBS</h1>
      <div className="bg-white w-full h-0.5 mb-4" />
      <div className="flex space-x-5 overflow-x-auto items-center">
        {clubs.map((club, index) => (
          <ClubWidget key={index} title={club.title} imgURL={club.imgURL} />
        ))}
      </div>
    </div>
  );
};

export default Home;
