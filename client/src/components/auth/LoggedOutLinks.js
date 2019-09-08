import React from 'react'
import { NavLink } from 'react-router-dom'

const LoggedOutLinks = () => {
    return (
        <ul className="right">
            <li>
                <NavLink to="/signup"><h6>Sign Up</h6></NavLink>
            </li>
            <li>
                <NavLink to="/signin"><h6>Log In</h6></NavLink>
            </li>
        </ul>
    )
}

export default LoggedOutLinks