import React, { Component } from 'react'
import JobUploadForm from '../../components/layout/JobUploadForm';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Upload extends Component {
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to="/signin" />
        return (
            <JobUploadForm />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Upload);