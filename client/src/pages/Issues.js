import React, { Component } from 'react'
import UpIssueTile from '../components/layout/UpIssueTile';


class Issues extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        var axios = require('axios');
        axios.get("https://git-lance.firebaseapp.com/api/solve/bounty").then((res) => {
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
                <h4>Issues</h4>
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
                                            return (
                                                <div className="col m3">
                                                    <a href="/solissue"><UpIssueTile
                                                        title={value.bountyName}
                                                        name={value.creatorName}
                                                        repo={value.Repo}
                                                        pay={value.bountyValue}
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

export default Issues