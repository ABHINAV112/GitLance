import React, { Component } from 'react'
import ScoreCard from '../../components/layout/ScoreCard';
import { connect } from 'react-redux'

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

        const { auth } = this.props;

        console.log(this.props)

        var options = {
            method: 'POST',
            url: 'https://git-lance.firebaseapp.com/api/upload/jobSubmission',
            headers:
            {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: auth.uid, jobId: this.props.location.data.jobId }),
            json: true
        };
        {/*this.props.location.data.jobId*/ }
        fetch(options.url, options).then((res) => res.json()).then((res) => { this.setState({ "submissions": res.submissions }); this.setState({ "submissionKeys": Object.keys(res.submissions) }); })
    }
    render() {
        return (
            <div className="container">
                {
                    this.state.submissionKeys.map((value) => {
                        return (<ScoreCard
                            // title={this.state.submissions[value].solverUserName}
                            // runtime={this.state.submissions[value].scores.time % 101}
                            // memory={this.state.submissions[value].scores.memory % 101}
                            // efficiency={this.state.submissions[value].scores.efficiency % 101}
                            // overall={this.state.submissions[value].scores.total % 101}
                            dataSolver={this.state.submissions[value]}
                            dataProblem={this.props.location}
                            solverID={value}
                        />)
                    })

                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(ProblemSubs);