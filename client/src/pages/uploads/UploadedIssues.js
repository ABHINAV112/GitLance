import React, { Component } from 'react'
import UpIssueTile from '../../components/layout/UpIssueTile';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class UploadedIssues extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        // var axios = require('axios');
        // axios.get("https://git-lance.firebaseapp.com/api/solve/bounty").then((res) => {
        //     var data = res.data.records;
        //     this.setState({ data });
        // })

        var fetch = require('node-fetch');
        const { auth } = this.props;

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
                                                    <Link to={{
                                                        pathname: "/subissue", data: value
                                                    }}> <UpIssueTile
                                                            title={value.bountyName}
                                                            name={value.creatorName}
                                                            repo={value.Repo}
                                                            pay={value.bountyValue}
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
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(UploadedIssues)