import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const Landing = () => {
    const { auth } = this.props;
    if (auth.uid) return <Redirect to='/home' />
    return (
        <div className="container">
            <h1>INtro</h1>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Landing);