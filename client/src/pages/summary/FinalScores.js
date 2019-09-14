import React, { Component } from 'react'
import ProblemSubmitted from '../../components/layout/ProblemSubmitted';

class FinalScores extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <ProblemSubmitted
                    data={this.props.history.location.state}
                />
                <textarea>{this.props.history.location.state.file.output}</textarea>
                <textarea>{this.props.history.location.state.file.actualOutput}</textarea>
            </div>
        )
    }
}

export default FinalScores