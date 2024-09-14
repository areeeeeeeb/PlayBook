import { Routes, Route, Link } from 'react-router-dom'
import Home from "./pages/home";
import Landing from './pages/landing';
import Create from './pages/Create';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<Create />}  />
    </Routes>
  );
}