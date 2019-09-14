import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Profile extends Component {
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to="/" />
        return (
            <div>
                Coming Soon...
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Profile)