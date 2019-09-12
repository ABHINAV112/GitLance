import React, { Component } from 'react'
import { connect } from 'react-redux';
class IssueSolution extends Component {

    state = {
        gitUserName: '',
        gitRepository: '',
        issueId: '',
        solverId: '',
        solverUserName: '',
        answer: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        const { auth } = this.props;

        var uploadedSol = this.state;
        uploadedSol = {
            solverId: auth.uid,
            solverUserName: auth.displayName
        }
        console.log(uploadedSol)
        var request = require("request");

        var options = {
            method: 'POST',
            url: 'https://git-lance.firebaseapp.com/api/solve/submission/issue',
            headers:
            {
                'Postman-Token': 'b021c797-c6df-434f-8184-193dc71ccacd',
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: uploadedSol,
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

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });
    }


    render() {
        return (
            <div>
                <div className="card-panel card-border red lighten-2 white-text issuesol">
                    <div className="row">
                        <div className="col m4">
                            <h3>Issue: </h3>
                            <div className="issue-desc">
                                <h5>{this.props.issue}</h5>
                            </div>
                            <h4>Repo: </h4>
                            <h5>{this.props.repo}</h5>
                        </div>
                        <div className="col m8">
                            <div>
                                <textarea className="white card-border textsol" id="answer" onChange={this.handleChange}>
                                </textarea>
                            </div>
                            <button className="right btn card-border" onClick={this.handleSubmit}>Submit</button>
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