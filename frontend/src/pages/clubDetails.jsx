import React from 'react';
import { useParams, Link } from 'react-router-dom';

// This would typically come from an API or database
const clubData = {
  "CSC": {
    title: "CSC",
    imgURL: "https://media.licdn.com/dms/image/v2/D560BAQEzT7qXPY5mMw/company-logo_200_200/company-logo_200_200/0/1689902647768/uwcsclub_logo?e=2147483647&v=beta&t=qEyNgISeXEO4VG0gPJ9FJ7Nq-FX9oAuCRf4iCQKfCmM",
    bannerURL: "https://www.yorkregiontutoring.com/wp-content/uploads/2021/05/University-of-Waterloo-Cheriton-School-Computer-Science-Davis-Centre.jpg",
    description: "The Computer Science Club (CSC) is a student-run organization dedicated to fostering a community of tech enthusiasts and promoting computer science education.",
    events: ["Weekly coding workshops", "Annual hackathon", "Industry speaker series"]
  },
  "Math Soc": {
    title: "Math Soc",
    imgURL: "https://mathsoc.uwaterloo.ca/wp-content/uploads/2020/06/mathsoc-logo.png",
    description: "The Mathematics Society (Math Soc) is committed to enriching the academic and social lives of mathematics students through various programs and events.",
    events: ["Math problem-solving sessions", "Pi Day celebration", "Career networking nights"]
  }
};

const ClubDetails = () => {
  const { clubTitle } = useParams();
  const club = clubData[clubTitle];

  return (
    <div className="space-y-2 text-white">
        <div className='space-y-[-35px]'>
            <img 
                className='relative z-0 left-0 object-cover w-screen h-32 bg-red-400'
                src={club.bannerURL} 
            />
            <div className='relative px-8 z-10 flex z-10 items-end justify-between'>
                <img
                    src={club.imgURL} 
                    alt={club.title} 
                    className="w-20 aspect-square object-contain bg-white rounded-lg mr-4"
                />
                <button className='w-28 border-[1px] text-black bg-white border-white rounded-md'>Follow</button>
            </div>
        </div>

        <div className='px-8'>
        <h1 className="text-3xl font-bold">{club.title}</h1>
        <p className="mb-4">{club.description}</p>
        <h2 className="text-2xl mb-2"> Events</h2>
        {/* <ul className="list-disc list-inside">
            {club.events.map((event, index) => (
            <li key={index}>{event}</li>
            ))}
        </ul> */}
        </div>
    </div>
  );
};

export default ClubDetails;