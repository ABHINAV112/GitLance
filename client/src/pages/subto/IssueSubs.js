import React, { Component } from 'react'
import SubmittedIssue from '../../components/layout/SubmittedIssue';

class IssueSubs extends Component {

    render() {

        return (
            <SubmittedIssue
                data={this.props.location.data}
                answer="Lorem Ipsum" />
        )
    }
}

export default IssueSubs;