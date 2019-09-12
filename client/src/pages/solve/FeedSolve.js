import React, { Component } from 'react';
import UpProbTile from '../../components/layout/UpProbTile';
import UpIssueTile from '../../components/layout/UpIssueTile';
import { BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const axios = require("axios");

class FeedSolve extends Component {
    state = {
        data: [],
        data2: []
    }
    componentDidMount() {
        axios.get("https://git-lance.firebaseapp.com/api/solve/bounty").then((res) => {
            var data = res.data.records;
            this.setState({ data });
        })
        axios.get("https://git-lance.firebaseapp.com/api/solve/problems").then((res) => {
            var data2 = res.data.records;
            this.setState({ data2 });
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
                    <a href="/issues"><h4> Issues</h4></a>
                    <ul className="list-container">
                        {
                            this.state.data.map(i => {
                                console.log(i);
                                return (<li className="list-item"><a href="/solissue"><UpIssueTile
                                    title={i.bountyName}
                                    name={i.creatorName}
                                    repo={i.Repo}
                                    pay={i.bountyValue}
                                /></a></li>
                                );
                            })
                        }
                    </ul>
                    <a href="/problem"><h4>Problems</h4></a>
                    <ul className="list-container">
                        {
                            this.state.data2.map(i => {
                                console.log(i);
                                return (<li className="list-item"><a href="/solproblem"><UpProbTile
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

export default connect(mapStateToProps)(FeedSolve);


