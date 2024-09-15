import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [protectedMessage, setProtectedMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  // Base URL of the Flask backend
  const baseURL = "http://127.0.0.1:5000";

  // Function to fetch protected content
  const fetchProtected = () => {
    axios
      .get(`${baseURL}/api/protected/`, { withCredentials: true })
      .then((response) => setProtectedMessage(response.data.message))
      .catch((error) =>
        setProtectedMessage(
          error.response?.data?.message || "Error fetching content"
        )
      );

    console.log(protectedMessage);
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/current_user/`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          setEmail(response.data.email);
          setUserId(response.data.user_id);
          setMessage(`Welcome back, ${response.data.email}`);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUserId(null);
      });
    fetchProtected();
  }, []);

  // Function to handle user login
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent page reload
    axios
      .post(
        `${baseURL}/api/login/`,
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        setMessage(response.data.message);
        setIsLoggedIn(true);
        setUserId(response.data.user_id); // Store user ID in state
        setName(response.data.name);
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || "Login failed");
        setIsLoggedIn(false);
        setUserId(null);
      });
  };

  // Function to handle user logout
  const handleLogout = () => {
    axios
      .post(`${baseURL}/api/logout/`, {}, { withCredentials: true })
      .then((response) => {
        setMessage(response.data.message);
        setIsLoggedIn(false);
        setUserId(null); // Clear user ID
        setEmail(""); // Clear username
      })
      .catch((error) =>
        setMessage(error.response?.data?.message || "Logout failed")
      );
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 text-white">
        <p>{message}</p>
        {isLoggedIn && (
          <div>
            <p>
              You are logged in as {name} (User ID: {userId}).
            </p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        <h1 className="text-3xl font-bold italic">PLAY HARD,</h1>
        <h1 className="text-3xl font-bold italic">BOOK HARD (?)</h1>
        <form className="space-y-2 text-black" onSubmit={handleLogin}>
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
              id="email"
              placeholder="Type your e-mail"
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="">
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
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md bg-indigo-500 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </>
  );
}
