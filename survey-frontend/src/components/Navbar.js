// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/dashboard">Survey Site</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        {localStorage.getItem('token') ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create-survey">Create Survey</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/surveys">
                                        All Surveys
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-danger nav-link" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Sign In</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
