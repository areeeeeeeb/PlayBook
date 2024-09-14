import { Routes, Route, Link } from 'react-router-dom'
import Home from "./pages/Home";
import Landing from './pages/Landing';
import Create from './pages/Create';
import Header from './components/Header';


export default function App() {
  return (
    <div className="bg-black h-screen">
      <Header/>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/create" element={<Create/>}  />
      </Routes>
    </div>
  );
}