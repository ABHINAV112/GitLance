import React, { Component } from 'react';
import UpProbTile from '../components/layout/UpProbTile';
import { BrowserRouter } from 'react-router-dom';


var request = require("request");
const axios = require("axios");
var options = {
    method: 'GET',
    url: 'https://git-lance.firebaseapp.com/api/solve/bounty',
    headers:
    {
        'Postman-Token': '2b44ee86-0d06-441e-8b57-e348efc73cff',
        'cache-control': 'no-cache'
    },
    async: false
};


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
        return (
            <BrowserRouter>
                <div className="container">
                    <h4>Uploads</h4>
                    <ul className="list-container">
                        {
                            this.state.data.map(i => {
                                console.log(i);
                                var currSubLength;

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



export default Home;


