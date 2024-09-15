import React from "react";
import { Link } from "react-router-dom";

const ClubWidget = ({ title, imgURL }) => {
  return (
    <Link to={`/club/${encodeURIComponent(title)}`} className="block">
      <div className="text-center">
        <img
          className="w-28 object-fill bg-white aspect-square rounded-lg mx-auto"
          src={imgURL}
          alt={title}
        />
        <p className="mt-2 text-white">{title}</p>
      </div>
    </Link>
  );
};

export default ClubWidget;