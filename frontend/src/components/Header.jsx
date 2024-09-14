import React from 'react';
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
        <div className="flex w-screen justify-between p-2">
            <div className="flex space-x-3 items-center">
                <div className="header text-white text-4xl"> 🤩 </div>
                <NavItem to="/home">Home</NavItem>
                <NavItem to="/discover">Discover</NavItem>
                <NavItem to="/calendar">Calendar</NavItem>
            </div>
            
            <div className="flex space-x-3 items-center">
                <NavItem to="/create">Create Event</NavItem>
            </div>
        </div>
    );
};

export default Header;