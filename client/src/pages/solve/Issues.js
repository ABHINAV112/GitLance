import React, { Component } from 'react'
import UpIssueTile from '../../components/layout/UpIssueTile';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'


class Issues extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        // var axios = require('axios');
        // axios.get("https://git-lance.firebaseapp.com/api/solve/bounty").then((res) => {
        //     var data = res.data.records;
        //     this.setState({ data });
        // })

        const { auth } = this.props;

        var fetch = require('node-fetch');

        var options = {
            method: 'POST',
            url: 'https://git-lance.firebaseapp.com/api/solve/bounty',
            headers:
            {
                'Postman-Token': '6f722472-ad24-4388-be60-fad98c77d367',
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
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

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
        if (this.state.data.length) {
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
                                                        <Link to={{ pathname: "/solissue", data: value }} > <UpIssueTile
                                                            title={value.bountyName}
                                                            name={value.creatorName}
                                                            repo={value.Repo}
                                                            pay={value.bountyValue}
                                                        /> </Link>
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
        else {
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
                    <div className="center-text">
                        <h5>No Issues to Solve</h5>
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

export default connect(mapStateToProps)(Issues)