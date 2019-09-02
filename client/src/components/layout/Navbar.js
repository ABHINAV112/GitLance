import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">GitLance</Link>
                <ul className="right">
                    <li><NavLink to='/'><i className="medium material-icons">home</i></NavLink></li>
                    <li><NavLink to='/workspace'><i className="medium material-icons">dashboard</i></NavLink></li>
                    <li><NavLink to='/'><i className="medium material-icons">forum</i></NavLink></li>
                    <li><NavLink to='/'><i className="medium material-icons">person</i></NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;