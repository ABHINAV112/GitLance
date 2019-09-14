import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SubmittedIssue extends Component {
    render() {
        return (
            <div className="container">
                <div className="card-panel teal card-border white-text">
                    <h4>{this.props.data.bountyName}</h4>
                    <h5>{this.props.data.Repo}</h5>
                    <h5>{this.props.answer}</h5>
                </div>
                <Link to={{ pathname: "/buy", data: this.props.data }}><button className="btn right">Buy</button></Link>
            </div>
        )
    }
}

export default SubmittedIssue