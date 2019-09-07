import React, { Component } from 'react';
import UpProbTile from '../components/UpProbTile';
import { BrowserRouter } from 'react-router-dom';

const a = [
    {
        title: "Title",
        description: "XXXXX XXXX XXXXX XXXX XXX XXXX XXXXXX XXXXXX",
        score: "22",
        submissions: "3",
        pay: "10,000"
    },
    {
        title: "Title",
        description: "XXXXX XXXX XXXXX XXXX XXX XXXX XXXXXX XXXXXX",
        score: "22",
        submissions: "3",
        pay: "10,000"
    },
    {
        title: "Title",
        description: "XXXXX XXXX XXXXX XXXX XXX XXXX XXXXXX XXXXXX",
        score: "22",
        submissions: "3",
        pay: "10,000"
    },
    {
        title: "Title",
        description: "XXXXX XXXX XXXXX XXXX XXX XXXX XXXXXX XXXXXX",
        score: "22",
        submissions: "3",
        pay: "10,000"
    },
    {
        title: "Title",
        description: "XXXXX XXXX XXXXX XXXX XXX XXXX XXXXXX XXXXXX",
        score: "22",
        submissions: "3",
        pay: "10,000"
    },
    {
        title: "Title",
        description: "XXXXX XXXX XXXXX XXXX XXX XXXX XXXXXX XXXXXX",
        score: "22",
        submissions: "3",
        pay: "10,000"
    },
    {
        title: "Title",
        description: "XXXXX XXXX XXXXX XXXX XXX XXXX XXXXXX XXXXXX",
        score: "22",
        submissions: "3",
        pay: "10,000"
    },
    {
        title: "Title",
        description: "XXXXX XXXX XXXXX XXXX XXX XXXX XXXXXX XXXXXX",
        score: "22",
        submissions: "3",
        pay: "10,000"
    },
    {
        title: "Title",
        description: "XXXXX XXXX XXXXX XXXX XXX XXXX XXXXXX XXXXXX",
        score: "22",
        submissions: "3",
        pay: "10,000"
    }
]

class Home extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <h4>Uploads</h4>
                    <ul className="list-container">
                        {a.map(i => {
                            return (<li className="list-item"><UpProbTile
                                title={i.title}
                                description={i.description}
                                score={i.score}
                                submissions={i.submissions}
                                pay={i.pay}
                            /></li>)
                        })}
                    </ul>
                </div>
            </BrowserRouter >
        )
    }
}

export default Home;