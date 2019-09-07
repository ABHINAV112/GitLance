import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Dropdown, NavItem } from 'react-materialize';
import M from 'materialize-css';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            hover: false,
            trigger: false,
        };
    }

    hoverOn = () => {
        this.setState({
            hover: true,
            trigger: true
        });
        console.log("works")
        console.log(this.state.trigger)
    }

    hoverOff = () => {
        this.setState({
            hover: false,
            trigger: false
        });
    }

    render() {
        return (
            <nav className="nav-wrapper grey darken-3">
                <div className="container">
                    <Link to='/home' className="brand-logo">GitLance</Link>
                    <ul className="right">
                        <li>
                            <div onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}>
                                <Dropdown trigger={
                                    <a className="grey darken-3">
                                        <h6 className="nav-header left">
                                            Solve
                                    </h6>
                                        <i className="material-icons right">arrow_drop_down</i>
                                    </a>
                                }>
                                    <NavItem href="/home">home</NavItem>
                                    <NavItem href="/solve">Solve</NavItem>
                                </Dropdown>
                            </div>
                        </li>
                        <li>
                            <Dropdown trigger={
                                <a className="grey darken-3">
                                    <h6 className="nav-header left">
                                        Upload
                                    </h6>
                                    <i className="material-icons right">arrow_drop_down</i>
                                </a>
                            }>
                                <NavItem href="/home">home</NavItem>
                                <NavItem href="/solve">Solve</NavItem>
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown trigger={
                                <img src="https://i.pravatar.cc/150?img=3" className="btn btn-floating" />
                            }>
                                <NavItem href="/home">home</NavItem>
                                <NavItem href="/solve">Solve</NavItem>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default Navbar;
