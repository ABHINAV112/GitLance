import React, { Component } from 'react'
import UpProbTile from '../../components/layout/UpProbTile';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class UploadedProblems extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        // var axios = require('axios');
        // axios.get("https://git-lance.firebaseapp.com/api/solve/problems").then((res) => {
        //     var data = res.data.records;
        //     this.setState({ data });
        // })

        var fetch = require('node-fetch')

        const { auth } = this.props;

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
            var data = res.records;
            this.setState({ data })
        })
    }



    render() {
        var recordsLength = this.state.data.length;
        var rows = Math.ceil(recordsLength / 4);
        var count = 0;
        var rowMapping = [];
        for (let i = 0; i < rows; i++) rowMapping.push(i);

        var rowData = [];
        var currRow = []
        for (let i = 0; i < recordsLength; i++) {
            if (i % 4 != 0 || i == 0) {
                currRow.push(this.state.data[i]);
            }
            else {
                rowData.push(currRow);
                currRow = [];
                currRow.push(this.state.data[i]);
            }
            if (i == recordsLength - 1) {
                currRow.push(this.state.data[i]);
                rowData.push(currRow);
            }
        }

        if (this.state.data.length) {
            return (
                <div className="container">
                    <h4>Uploaded Problems</h4>
                    {/* <div className="row">
                        <div className="col m3">
                            <UpIssueTile />
                        </div>
                        <div className="col m3">
                            <UpIssueTile />
                        </div>
                        <div className="col m3">
                            <UpIssueTile />
                        </div>
                        <div className="col m3">
                            <UpIssueTile />
                        </div>
                    </div> */}
                    {
                        rowMapping.map((outerValue, outerIndex) => {
                            return (
                                <div className="row">
                                    {
                                        rowData[outerIndex].map(
                                            (value, index) => {
                                                var scoreVal = "no submissions";
                                                var currSubmissions = value.submissions;
                                                var currBestSubmission = value.bestSubmissionId;
                                                var submissionsVal = "no submissions";
                                                if (Object.keys(currSubmissions).length) {
                                                    submissionsVal = Object.keys(currSubmissions).length;
                                                    scoreVal = currSubmissions[currBestSubmission].scores.total;
                                                }

                                                return (
                                                    <div className="col m3">
                                                        <Link to={{
                                                            pathname: "/subproblem", data: value
                                                        }}> <UpProbTile
                                                                title={value.problemHeading}
                                                                description={value.problemDescription}
                                                                name={value.creatorName}
                                                                score={scoreVal}
                                                                submissions={submissionsVal}
                                                                pay={value.pay}
                                                            /></Link>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                </div>

                            )

                        })
                    }
                </div>
            )
        } else {
            return (
                <div className="container">
                    <h4>Uploaded Problems</h4>
                    {/* <div className="row">
                        <div className="col m3">
                            <UpIssueTile />
                        </div>
                        <div className="col m3">
                            <UpIssueTile />
                        </div>
                        <div className="col m3">
                            <UpIssueTile />
                        </div>
                        <div className="col m3">
                            <UpIssueTile />
                        </div>
                    </div> */}
                    <div className="center-text">
                        <h5>No Problems Uploaded</h5>
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

export default connect(mapStateToProps)(UploadedProblems)