import React, { Component } from 'react'
import ProblemSubmitted from '../../components/layout/ProblemSubmitted';

class SubmittedProblem extends Component {
    render() {
        return (
            <div className="container">
                <ProblemSubmitted />
            </div>
        )
    }
}

export default SubmittedProblem;