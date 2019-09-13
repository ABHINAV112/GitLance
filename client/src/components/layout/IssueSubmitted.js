import React, { Component } from 'react'

class IssueSubmitted extends Component {
    render(props) {

        return (
            <div className="container">
                <div className="card-panel teal card-border white-text">
                    <h4>{this.props.data.bountyName}</h4>
                    <h5>Repo: {this.props.data.gitRepo}</h5>
                    <h5>Answer: {this.props.data.answer}</h5>
                </div>
            </div>
        )
    }
}

export default IssueSubmitted