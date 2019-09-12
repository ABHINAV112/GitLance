import React, { Component } from 'react';
import UpProbTile from '../../components/layout/UpProbTile';
import UpIssueTile from '../../components/layout/UpIssueTile';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class FeedSolve extends Component {
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



        var options = {
            method: 'POST',
            url: 'https://git-lance.firebaseapp.com/api/solve/problems',
            headers:
            {
                'Postman-Token': 'db30edf6-fbd6-41ad-acc7-75417ebf0299',
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


    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (

            <div className="container">
                <a href="/issues"><h4> Issues</h4></a>
                <ul className="list-container">
                    {
                        this.state.data.map(i => {
                            return (<li className="list-item"><Link to={{ pathname: "/solissue", data: i }}>
                                <UpIssueTile
                                    title={i.bountyName}
                                    name={i.creatorName}
                                    repo={i.Repo}
                                    pay={i.bountyValue}
                                /></Link></li>
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

        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(FeedSolve);
