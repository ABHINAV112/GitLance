import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, NavItem } from 'react-materialize'
import M from 'materialize-css'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const LoggedInLinks = (props) => {
    return (
        <ul className="right">
            <li>
                <div>
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
                    <NavItem href="/home">My Profile</NavItem>
                    <NavItem onClick={props.signOut}>Log Out</NavItem>
                </Dropdown>
            </li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(LoggedInLinks)