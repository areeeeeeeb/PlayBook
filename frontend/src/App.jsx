import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Landing from "./pages/landing";
import Create from "./pages/create";
import LoginPage from "./pages/loginPage";
import Discover from "./pages/discover";
import Header from "./components/header";
import Calendar from "./pages/calendar";
import ClubDetails from "./pages/clubDetails";

export default function App() {

  return (
    <div className="bg-black h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/club/:clubTitle" element={<ClubDetails />} />
      </Routes>
    </div>
  );
}
