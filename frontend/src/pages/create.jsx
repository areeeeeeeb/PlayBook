import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Create() {
  const navigate = useNavigate();

  const [user_id, setUser_id] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (e) => {
    console.log("submitted");

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
    <div className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold italic">PLAY HARD,</h1>
      <h1 className="text-3xl font-bold italic">BOOK HARD (?)</h1>
      <form className="space-y-2" onSubmit={onSubmit}>
        <div className="">
          <label
            htmlFor="userID"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            UserID
          </label>
          <input
            onChange={(e) => setUser_id(e.target.value)}
            type="text"
            id="userID"
            placeholder="Enter your UserID"
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            placeholder="Enter Title"
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            id="description"
            placeholder="Enter Description"
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        >
          Create Event
        </button>

        <button onClick={() => navigate("/home")}>Home</button>
      </form>
    </div>
  );
}
