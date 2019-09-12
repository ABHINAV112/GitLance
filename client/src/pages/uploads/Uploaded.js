import React, { Component } from 'react';
import UpProbTile from '../../components/layout/UpProbTile';
import UpIssueTile from '../../components/layout/UpIssueTile';
import { BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class Uploaded extends Component {
    state = {
        data: [],
        data2: []
    }
    componentDidMount() {
        // axios.get("https://git-lance.firebaseapp.com/api/solve/bounty").then((res) => {
        //     var data = res.data.records;
        //     this.setState({ data });
        // })
        // axios.get("https://git-lance.firebaseapp.com/api/solve/problems").then((res) => {
        //     var data2 = res.data.records;
        //     this.setState({ data2 });
        // })

        const { auth } = this.props;

        var fetch = require("node-fetch");

        var options = {
            method: 'POST',
            url: 'https://git-lance.firebaseapp.com/api/upload/uploadedIssues',
            headers:
            {
                'Postman-Token': '41582a4d-a65f-40d8-ac5d-ca27b473348d',
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: auth.uid }),
            json: true
        };

        fetch(options.url, options).then((res) => res.json()).then((res) => {
            var data = res.records;
            this.setState({ data })
        })

        var options = {
            method: 'POST',
            url: 'https://git-lance.firebaseapp.com/api/upload/uploadedProblems',
            headers:
            {
                'Postman-Token': '90e98916-3334-4913-9fbf-8242fdd295d1',
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: auth.uid }),
            json: true
        };

        fetch(options.url, options).then((res) => res.json()).then((res) => {
            var data2 = res.records;
            this.setState({ data2 })
        })


    }

    returnInfo(e) {
        e.preventDefault()
        // console.log(e.target.problemHeading)
        // console.log(e.target.creatorName)
    }

    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <BrowserRouter>
                <div className="container">
                    <a href="/uploadedissues"><h4>Uploaded Issues</h4></a>
                    <ul className="list-container">
                        {
                            this.state.data.map(i => {
                                console.log(i);
                                return (<li className="list-item"><a href="/"><UpIssueTile
                                    title={i.bountyName}
                                    name={i.creatorName}
                                    repo={i.Repo}
                                    pay={i.bountyValue}
                                /></a></li>
                                );
                            })
                        }
                    </ul>
                    <a href="/uploadedproblems"><h4>Uploaded Problems</h4></a>
                    <ul className="list-container">
                        {
                            this.state.data2.map(i => {
                                console.log(i);
                                return (<li className="list-item"><a href="/subproblem"><UpProbTile
                                    title={i.problemHeading}
                                    description={i.problemDescription}
                                    name={i.creatorName}
                                    score={0}
                                    submissions={Object.keys(i.submissions).length}
                                    pay={i.pay}
                                /></a></li>
                                );
                            })
                        }
                    </ul>
                </div>
            </BrowserRouter >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Uploaded);


