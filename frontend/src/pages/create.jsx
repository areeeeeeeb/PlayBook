import React, { useState } from 'react';
import { Calendar, MapPin, AlignLeft, Ticket, Users } from 'lucide-react';

export default function Create() {
  const [user_id, setUser_id] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user_id,
      title,
      description,
    };
    console.log(data);
    const url = "http://127.0.0.1:5000/api/events/";
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
  };

  return (
    <div className="flex flex-col p-4 space-y-4 rounded-lg max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold italic">PLAY HARD,</h1>
      <h1 className="text-3xl font-bold italic mb-4">BOOK HARD (?)</h1>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex p-4 space-x-2 rounded-lg">
          {/* IMAGE */}
          <div className="w-1/3 aspect-square bg-blue-100 rounded-lg p-4"/>
          {/* EVENT DETAILS */}
          <div className="w-2/3">
            {/* TITLE */}
            <input
              type="text"
              placeholder="Event Name"
              className="w-full text-2xl text-white font-semibold bg-transparent border-b mb-4 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* DATES */}
            <div className="rounded-lg p-4 mb-4 bg-white/10 text-white">
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-gray-700">Start</span>
                <span className="ml-auto">Sat, Sep 14</span>
                <span className="ml-4">11:00 AM</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-gray-700">End</span>
                <span className="ml-auto">Sat, Sep 14</span>
                <span className="ml-4">12:00 PM</span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <label htmlFor="userID" className="block text-sm  font-medium text-gray-500 mb-1">
                  User
                </label>
                <input
                  onChange={(e) => setUser_id(e.target.value)}
                  type="text"
                  id="userID"
                  placeholder="Johnny Appleseed"
                  className="w-full px-3 py-2 focus:outline-none placeholder-gray-700 text-white rounded-lg bg-white/10 rounded-md "
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-500 mb-1">
                  Description
                </label>
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  id="description"
                  placeholder="Such a cool event."
                  className="w-full px-3 py-2 focus:outline-none placeholder-gray-700 text-white rounded-lg bg-white/10 rounded-md"
                />
              </div>

              <button
                type="submit"
                className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
          
        
      </form>
    </div>
  );
}