import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import LoggedInLinks from '../auth/LoggedInLinks';
import LoggedOutLinks from '../auth/LoggedOutLinks';
import { connect } from 'react-redux';


class Navbar extends Component {

    render() {
        return (
            <nav className="nav-wrapper grey darken-3">
                <div className="container">
                    <Link to='/home' className="brand-logo">GitLance</Link>
                    <LoggedOutLinks />
                    <LoggedInLinks />
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {

    }
}

export default connect(mapStateToProps)(Navbar);
