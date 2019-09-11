import React, { Component } from 'react'
import ScoreCard from '../components/layout/ScoreCard';

// this is where we will have all problems uploaded by user
class ProblemSubs extends Component {
    constructor() {
        super();
        this.state = {
            submissions: [],
            submissionKeys: []
        }
    }

    componentDidMount() {
        var fetch = require("node-fetch");

        var options = {
            method: 'POST',
            url: 'https://git-lance.firebaseapp.com/api/upload/jobSubmission',
            headers:
            {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: 'LyNg9CA2GhUBfYIRnO9OLDkNWg03', jobId: 'job_21' }),
            json: true
        };

        fetch(options.url, options).then((res) => res.json()).then((res) => { this.setState({ "submissions": res.submissions }); this.setState({ "submissionKeys": Object.keys(res.submissions) }); console.log(this.state) })
    }
    render() {
        return (
            <div className="container">
                {
                    this.state.submissionKeys.map((value) => {
                        return (<ScoreCard
                            title={this.state.submissions[value].solverUserName}
                            runtime={this.state.submissions[value].scores.time % 101}
                            memory={this.state.submissions[value].scores.memory % 101}
                            efficiency={this.state.submissions[value].scores.efficiency % 101}
                            overall={this.state.submissions[value].scores.total % 101}
                        />)
                    })

                }

            </div>
        )
    }
}

export default ProblemSubs;