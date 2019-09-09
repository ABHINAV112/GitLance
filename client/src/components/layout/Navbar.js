import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import LoggedInLinks from '../auth/LoggedInLinks';
import LoggedOutLinks from '../auth/LoggedOutLinks';
import { connect } from 'react-redux';


const Navbar = props => {
    const { auth } = props
    // console.log(auth)
    const links = auth.uid ? <LoggedInLinks /> : <LoggedOutLinks />
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/home' className="brand-logo">GitLance</Link>
                {links}
            </div>
        </nav>
    )
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar);
