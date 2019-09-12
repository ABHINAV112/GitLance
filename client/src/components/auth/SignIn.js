import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, signInWithGithub } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'


class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    handleLogInWithGithub = (e) => {
        e.preventDefault();
        this.props.signInWithGithub();
    }


    render() {
        const { auth } = this.props
        if (auth.uid) return <Redirect to='/home' />
        return (
            <div className="container">
                <div className="row">
                    <div className="col m4">
                    </div>
                    <div className="col m4">
                        <form onSubmit={this.handleSubmit} className="white">
                            <h5 className="grey-text text-darken-3">
                                Sign In
                    </h5>
                            <div className="input-field">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" onChange={this.handleChange} />
                            </div>
                            <div className="row">
                                <div className="input-field col m6">
                                    <button className="btn teal lighten-1 z-depth-0 center-align">Login</button>
                                </div>
                                <div onClick={this.handleLogInWithGithub} className="input-field col m6">
                                    <button className="btn teal lighten-1 z-depth-0 center-align">Github</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col m4">
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds)),
        signInWithGithub: () => dispatch(signInWithGithub())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);