import React, { Component } from 'react'
import ScoreCard from '../components/layout/ScoreCard';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class Solve extends Component {
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <ScoreCard runtime='50' memory='50' efficiency='50' overall='50' />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Solve);