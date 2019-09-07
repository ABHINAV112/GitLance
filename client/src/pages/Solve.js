import React, { Component } from 'react'
import ScoreCard from '../components/ScoreCard';


class Solve extends Component {
    render() {
        return (
            <div className="container">
                <ScoreCard runtime='50%' />
            </div>
        )
    }
}

export default Solve;