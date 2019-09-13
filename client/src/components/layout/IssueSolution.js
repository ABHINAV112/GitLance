import React, { Component } from 'react'
import { connect } from 'react-redux';
class IssueSolution extends Component {

    state = {
        answer: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }

    handleSubmit = (e) => {
        const { auth } = this.props;

        var uploadedSol = {
            gitUserName: this.props.data.gitRepoCreator,
            gitRepository: this.props.data.Repo,
            issueId: this.props.data.issue,
            solverId: auth.uid,
            solverUserName: auth.displayName,
            answer: this.state.answer
        }
        console.log(uploadedSol)
        var fetch = require("node-fetch");

        var options = {
            method: 'POST',
            url: 'https://git-lance.firebaseapp.com/api/solve/submission/issue',
            headers:
            {
                'Postman-Token': 'b021c797-c6df-434f-8184-193dc71ccacd',
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadedSol),
            // {
            //     gitUserName: 'Arcadier',
            //     gitRepository: 'Developer-Community-Support',
            //     issueId: 'issue_6',
            //     solverId: 'solverI1',
            //     solverUserName: 'solver1',
            //     answer: 'please dddon\'t npm i ------g thanos.js'
            // }
            json: true
        };
        fetch(options.url, options)
    }


    render() {
        return (
            <div>
                <div className="card-panel card-border teal lighten-2 white-text issuesol">
                    <div className="row">
                        <div className="col m4">
                            <h3>Issue: </h3>
                            <div className="issue-desc">
                                <h5>{this.props.data.bountyName}</h5>
                            </div>
                            <h4>Repo: </h4>
                            <h5>{this.props.data.Repo}</h5>
                        </div>
                        <div className="col m8">
                            <div>
                                <textarea className="white card-border textsol" id="answer" onChange={this.handleChange}>
                                </textarea>
                            </div>
                            <button className="right btn card-border red" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(IssueSolution);