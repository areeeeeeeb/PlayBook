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
        <div className=" flex w-screen justify-center z-40 justify-between px-10 p-4">
            <div className="flex space-x-5 items-center">
                <Logo/>
                <NavItem to="/home">Home</NavItem>
                <NavItem to="/discover">Discover</NavItem>
                
            </div>
            
            <div className="flex space-x-3 items-center">
                <NavItem to="/create">Create Event</NavItem>
            </div>
        </div>
    );
};

export default Header;