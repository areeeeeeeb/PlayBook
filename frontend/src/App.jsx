import { Routes, Route, Link } from 'react-router-dom'
import Home from "./pages/Home";
import Landing from './pages/Landing';
import Create from './pages/Create';
import Discover from './pages/discover';
import Header from './components/header';
import Calendar from './pages/calendar';


export default function App() {
  return (
    <div className="bg-black h-screen">
      <Header/>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/calendar" element={<Calendar/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/create" element={<Create/>}  />
        <Route path="/discover" element={<Discover/>}  />
      </Routes>
    </div>
  );
}