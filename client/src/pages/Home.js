import React, { Component } from 'react';
import UpProbTile from '../components/layout/UpProbTile';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const axios = require("axios");

class Home extends Component {
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
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <BrowserRouter>
                <div className="container">
                    <h4>Issues</h4>
                    <ul className="list-container">
                        {
                            this.state.data.map(i => {
                                console.log(i);
                                return (<li className="list-item"><UpProbTile
                                    title={i.bountyName}
                                    description={i.creatorName}
                                    submissions={0}
                                    pay={i.bountyValue}
                                /></li>
                                );
                            })
                        }
                    </ul>
                    <h4>Problems</h4>
                    <ul className="list-container">
                        {
                            this.state.data2.map(i => {
                                console.log(i);
                                return (<li className="list-item"><UpProbTile
                                    title={i.problemHeading}
                                    description={i.problemDescription}
                                    score={i.creatorName}
                                    submissions={Object.keys(i.submissions).length}
                                    pay={i.pay}
                                /></li>
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

export default connect(mapStateToProps)(Home);


