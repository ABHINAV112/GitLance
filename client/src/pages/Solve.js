import React, { Component } from 'react'
import ScoreCard from '../components/layout/ScoreCard';


class Solve extends Component {
    render() {
        return (
            <div className="container">
                <ScoreCard runtime='50' memory='50' efficiency='50' overall='50' />
            </div>
        )
    }
}

export default Solve;