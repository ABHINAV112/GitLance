import React, { Component } from 'react'
import IssueSubmitted from '../../components/layout/IssueSubmitted';

class SubmittedIssues extends Component {
    render() {
        return (
            <div className="container">
                <IssueSubmitted data={{
                    bountyName: "",
                    Repo: "",
                    answer: ""
                }} />
            </div>
        )
    }
}

export default SubmittedIssues