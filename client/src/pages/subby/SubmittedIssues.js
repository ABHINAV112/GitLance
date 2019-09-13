import React, { Component } from 'react'
import IssueSubmitted from '../../components/layout/IssueSubmitted';
import { connect } from 'react-redux'

class SubmittedIssues extends Component {
    constructor() {
        super();
        this.state = {
            submissions: []
        }
    }
    componentDidMount() {

        const { auth } = this.props;
        var fetch = require("node-fetch");

        var options = {
            method: 'POST',
            url: 'https://git-lance.firebaseapp.com/api/solve/selfIssueSubmission',
            headers:
            {
                'Postman-Token': '7a568af7-e01c-4e29-853a-f40bd04c6cbd',
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: auth.uid }),
            json: true
        };

        fetch(options.url, options).then((res) => res.json()).then((res) => {
            this.setState({ "submissions": res.records });
            console.log(this.state)
        })
    }
    render() {
        return (
            <div className="container">
                {
                    this.state.submissions.map(i => {
                        return (
                            <IssueSubmitted data={i} />
                        )
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

export default connect(mapStateToProps)(SubmittedIssues)