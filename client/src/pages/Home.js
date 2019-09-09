import React, { Component } from 'react';
import UpProbTile from '../components/layout/UpProbTile';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const axios = require("axios");



class Home extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        axios.get("https://git-lance.firebaseapp.com/api/solve/bounty").then((res) => {
            var data = res.data.records;
            this.setState({ data });
        })

    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <BrowserRouter>
                <div className="container">
                    <h4>Uploads</h4>
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


