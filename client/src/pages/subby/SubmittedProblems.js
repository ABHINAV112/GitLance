import React, { Component } from 'react'
import ProblemSubmitted from '../../components/layout/ProblemSubmitted';
import { connect } from 'react-redux'

class SubmittedProblem extends Component {
    constructor() {
        super();
        this.state = {
            submissions: []
        }
    }

    componentDidMount() {
        var fetch = require("node-fetch");

        const { auth } = this.props;

        var options = {
            method: 'POST',
            url: 'https://git-lance.firebaseapp.com/api/solve/selfProblemSubmission',
            headers:
            {
                'Postman-Token': '49318d42-def5-43dc-8515-1c67eead447b',
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: auth.uid }),
            json: true
        };

        fetch(options.url, options).then((res) => res.json()).then((res) => {
            this.setState({ "submissions": res.records });

        })
    }
    render() {
        console.log(this.state.submissions)
        if (this.state.submissions.length) {
            return (
                <div className="container">
                    <h4>Submitted Problems</h4>
                    {
                        this.state.submissions.map(i => {
                            return (
                                <ProblemSubmitted
                                    data={i}
                                />
                            )
                        })}
                </div>
            )
        }
        else {
            return (
                <div className="container">
                    <h4>Submitted Problems</h4>
                    <div className="center-text">
                        <h5>No Problems Submitted</h5>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(SubmittedProblem);