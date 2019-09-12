import React, { Component } from 'react'
import UpProbTile from '../../components/layout/UpProbTile';


class UploadedProblems extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        var axios = require('axios');
        axios.get("https://git-lance.firebaseapp.com/api/solve/problems").then((res) => {
            var data = res.data.records;
            this.setState({ data });
        })

    }



    render() {
        var recordsLength = this.state.data.length;
        console.log("Records", recordsLength)
        var rows = Math.ceil(recordsLength / 4);
        var count = 0;
        var rowMapping = [];
        for (let i = 0; i < rows; i++) rowMapping.push(i);
        console.log("rowMapp", rowMapping)
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
        console.log("Data", rowData)
        return (
            <div className="container">
                <h4>Problems</h4>
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
                                                    <a href="/solproblem"><UpProbTile
                                                        title={value.problemHeading}
                                                        description={value.problemDescription}
                                                        name={value.creatorName}
                                                        score={scoreVal}
                                                        submissions={submissionsVal}
                                                        pay={value.pay}
                                                    /></a>
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
    }
}

export default UploadedProblems