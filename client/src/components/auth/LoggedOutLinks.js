import React from 'react'
import { NavLink } from 'react-router-dom'

const LoggedOutLinks = () => {
    return (
        <ul className="right">
            <li>
                <div className="nav-element">
                    <NavLink to="/signup"><h6>Sign Up</h6></NavLink>
                </div>
            </li>
            <li>
                <div className="nav-element">
                    <NavLink to="/signin"><h6>Log In</h6></NavLink>
                </div>
            </li>
        </ul>
    )
}

export default LoggedOutLinks