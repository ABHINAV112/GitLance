import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class Landing extends Component {
    componentDidMount() {
        window.location.href = "https://git-lance-7c919.firebaseapp.com/"
    }
    render() {
        const { auth } = this.props;
        if (auth.uid) return <Redirect to='/home' />
        return (
            <div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Landing);