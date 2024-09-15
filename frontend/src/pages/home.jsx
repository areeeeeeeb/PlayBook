import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ClubWidget = ({ title, imgURL }) => {
  return (
    <Link to={`/club/${encodeURIComponent(title)}`} className="block">
      <div className="text-center">
        <img
          className="w-36 object-fill bg-white aspect-square rounded-lg mx-auto"
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
