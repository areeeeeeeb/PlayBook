import React from 'react';
import { Link } from 'react-router-dom';

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
    title: "CSC",
    imgURL: "https://media.licdn.com/dms/image/v2/D560BAQEzT7qXPY5mMw/company-logo_200_200/company-logo_200_200/0/1689902647768/uwcsclub_logo?e=2147483647&v=beta&t=qEyNgISeXEO4VG0gPJ9FJ7Nq-FX9oAuCRf4iCQKfCmM"
  },
  {
    title: "Math Soc",
    imgURL: "https://mathsoc.uwaterloo.ca/wp-content/uploads/2020/06/mathsoc-logo.png"
  },
];

const Home = () => {
  return (
    <div className="p-4 text-white items-center justify-start px-8">
      <h1 className="text-3xl mb-2">CLUBS I FOLLOW</h1>
      <div className="bg-white w-full h-0.5 mb-4"/>
      <div className="flex space-x-5 overflow-x-auto items-center">
        {clubs.map((club, index) => (
          <ClubWidget key={index} title={club.title} imgURL={club.imgURL} />
        ))}
      </div>
    </div>
  );
};

export default Home;