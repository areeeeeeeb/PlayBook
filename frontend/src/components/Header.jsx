import React from 'react';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const NavItem = ({ to, children }) => (
        <div 
            className="header text-white cursor-pointer hover:underline"
            onClick={() => navigate(to)}
        >
            {children}
        </div>
    );

    return (
        <div className=" flex w-screen justify-center  justify-between px-10 p-4">
            <div className="flex space-x-3 items-center">
                <Logo/>
                <NavItem to="/home">Home</NavItem>
                <NavItem to="/discover">Discover</NavItem>
                <NavItem to="/calendar">Calendar</NavItem>
            </div>
            
            <div className="flex space-x-3 items-center">
                <NavItem to="/create">Create Event</NavItem>
                <img className='w-6 object-fill aspect-square rounded-full' src='https://media.istockphoto.com/id/157030584/vector/thumb-up-emoticon.jpg?s=612x612&w=0&k=20&c=GGl4NM_6_BzvJxLSl7uCDF4Vlo_zHGZVmmqOBIewgKg='/>
            </div>
        </div>
    );
};

export default Header;