import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SmileyFaceBackground({ emoji = "" }) {
  const [smileyFaces, setSmileyFaces] = useState([]);
  const animationFrameRef = useRef(null);
  const maxSmileyFaces = 15; // Set your maximum number of smiley faces here

  useEffect(() => {
    if (smileyFaces.length < maxSmileyFaces) {
      const newSmileyFace = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 40 + 30,
        speedX: Math.random() * 1,
        speedY: Math.random() * 1,
      };
      setSmileyFaces(prevFaces => [...prevFaces, newSmileyFace]);
    }

    const animate = () => {
      setSmileyFaces(prevFaces => 
        prevFaces.map(smiley => {
          let newX = smiley.x + smiley.speedX;
          let newY = smiley.y + smiley.speedY;

          if (newX < 0 || newX > window.innerWidth) {
            smiley.speedX *= -1;
            newX = smiley.x + smiley.speedX;
          }
          if (newY < 0 || newY > window.innerHeight) {
            smiley.speedY *= -1;
            newY = smiley.y + smiley.speedY;
          }

          return { ...smiley, x: newX, y: newY };
        })
      );
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [smileyFaces]);

  return (
    <div className='absolute top-0 left-0 z-10 overflow-hidden w-full h-full'>
      {smileyFaces.map((smiley, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: smiley.x,
            top: smiley.y,
            width: smiley.size,
            height: smiley.size,
            textAlign: 'center',
            lineHeight: `${smiley.size}px`,
            fontSize: `${smiley.size / 0.5}px`,
            color: 'black',
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
    };
    console.log(data);
    const url = "http://127.0.0.1:5000/api/users/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    }
    navigate("/home");
  };

  return (
    <div className='overflow-hidden'>
      <SmileyFaceBackground emoji='😃'/>
      <div className='flex absolute w-full h-4/5 max-w-6xl justify-center items-center z-20'>
        <div className="w-1/2 p-6 space-y-6 text-white">
          <div>
            <h1 className="text-8xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">PLAYBOOK</h1>
            <h1 className="text-3xl font-medium italic drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Your campus, your calendar.</h1>
          </div>

          <form className="space-y-2 text-black" onSubmit={onSubmit}>
            <div className="">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white/40 mb-1"
              >
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="fullName"
                placeholder="Vivek"
                className="w-full px-3 py-2 placeholder-gray-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/40 mb-1"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                id="emailOrPhone"
                placeholder="vgoel@uwaterloo.ca"
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
              />
            </div>
            <div className="pb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/40 mb-1"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                placeholder="Type your password"
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white py-1 px-3 rounded-lg bg-yellow-500 focus:outline-none hover:rotate-2 hover:scale-110 transition-all duration-300"
            >
              Join the fun!
            </button>
          </form>

          <p className="text-sm text-gray-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
