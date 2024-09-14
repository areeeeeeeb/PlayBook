import React, { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [protectedMessage, setProtectedMessage] = useState("");

  // Base URL of the Flask backend
  const baseURL = "http://127.0.0.1:5000";

  // Function to handle user login
  const handleLogin = () => {
    axios
      .post(
        `${baseURL}/api/login/`,
        { email, password },
        { withCredentials: true }
      )
      .then((response) => setMessage(response.data.message))
      .catch((error) =>
        setMessage(error.response?.data?.message || "Login failed")
      );
  };

  // Function to handle user logout
  const handleLogout = () => {
    axios
      .post(`${baseURL}/api/logout/`, {}, { withCredentials: true })
      .then((response) => setMessage(response.data.message))
      .catch((error) =>
        setMessage(error.response?.data?.message || "Logout failed")
      );
  };

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
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Authentication Example</h1>
      <div>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <div className="flex gap-4">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <br />
      <button onClick={fetchProtected}>Fetch Protected Content</button>
      <br />
      <br />
      <div>
        <strong>Status Message:</strong>
        <p>{message}</p>
      </div>
      <div>
        <strong>Protected Content:</strong>
        <p>{protectedMessage}</p>
      </div>
    </div>
  );
}
