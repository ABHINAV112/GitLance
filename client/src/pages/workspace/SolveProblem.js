import React, { Component } from 'react'
import ProblemSolution from '../../components/layout/ProblemSolution';

class SolveProblem extends Component {
    render() {
        return (
            <div className="container">
                <ProblemSolution
                    data={this.props.location.data}
                />
            </div>
        )
    }
}

export default SolveProblem;