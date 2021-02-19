import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navItem">
                <Link to="/">Home</Link>
            </div>
            <div className="navItem">
                <Link to="/add/artist">Add Artist</Link>
            </div>
            <div className="navItem">
                <Link to="/add/album">Add Album</Link>
            </div>
            <div className="navItem">
                <Link to="/add/song">Add Song</Link>
            </div>
            <div className="navItem">
                <Link to="/add/collab">Add Collaborator</Link>
            </div>
        </div>
    );
};

export default Navbar;