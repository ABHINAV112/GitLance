import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, NavItem } from 'react-materialize'
import M from 'materialize-css'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

class LoggedInLinks extends Component {
    render(props) {
        const { auth } = this.props;
        if (auth.photoURL) {
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
                                <NavItem href="/home">Feed</NavItem>
                                <NavItem href="/issues">Issues</NavItem>
                                <NavItem href="/problem">Problem</NavItem>
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
                            <NavItem href="/uploaded">Feed</NavItem>
                            <NavItem href="/upload">New Job</NavItem>
                            <NavItem href="/uploadedissues">Issues</NavItem>
                            <NavItem href="/uploadedproblems">Problems</NavItem>
                        </Dropdown>
                    </li>
                    <li>
                        <Dropdown trigger={
                            <a className="grey darken-3">
                                <h6 className="nav-header-pos left">
                                    Submissions
                                        </h6>
                                <i className="material-icons right">arrow_drop_down</i>
                            </a>
                        }>
                            <NavItem href="/issuesub">Issues</NavItem>
                            <NavItem href="/problemsub">Problem</NavItem>
                        </Dropdown>
                    </li>
                    <li>
                        <h6 className="nav-pos-header">Balance: ${this.props.balance}</h6>
                    </li>
                    <li>
                        <Dropdown trigger={
                            <h6><img src={auth.photoURL} className="btn-floating" /></h6>
                        }>
                            <NavItem href="/profile">My Profile</NavItem>
                            <NavItem onClick={this.props.signOut}>Log Out</NavItem>
                        </Dropdown>
                    </li>
                </ul>
            )
        }
        else {
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
                                <NavItem href="/home">Feed</NavItem>
                                <NavItem href="/issues">Issues</NavItem>
                                <NavItem href="/problem">Problem</NavItem>
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
                            <NavItem href="/uploaded">Feed</NavItem>
                            <NavItem href="/upload">New Job</NavItem>
                            <NavItem href="/uploadedissues">Issues</NavItem>
                            <NavItem href="/uploadedproblems">Problems</NavItem>
                        </Dropdown>
                    </li>
                    <li>
                        <Dropdown trigger={
                            <a className="grey darken-3">
                                <h6 className="nav-header left">
                                    Submissions
                                        </h6>
                                <i className="material-icons right">arrow_drop_down</i>
                            </a>
                        }>
                            <NavItem href="/issuesub">Issues</NavItem>
                            <NavItem href="/problemsub">Problem</NavItem>
                        </Dropdown>
                    </li>
                    <li>
                        <Dropdown trigger={
                            <img src="https://i0.wp.com/afa.org.sg/wordpress/wp-content/uploads/2014/05/icon-user-default-copy.png?ssl=1" className="btn btn-floating" />
                        }>
                            <NavItem href="/profile">My Profile</NavItem>
                            <NavItem onClick={this.props.signOut}>Log Out</NavItem>
                        </Dropdown>
                    </li>
                </ul>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInLinks);