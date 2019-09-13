import React, { Component } from 'react'

class IssueSubmitted extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="container">
                <div className="card-panel teal card-border white-text">
                    <h4>{this.props.data.bountyName}</h4>
                    <h5>{this.props.data.Repo}</h5>
                    <h5>{this.props.answer}</h5>
                </div>
            </div>
        )
    }
}

export default IssueSubmitted