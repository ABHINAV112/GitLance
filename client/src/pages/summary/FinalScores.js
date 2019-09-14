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
                <div className="row">
                    <div className="col m6">
                        <div className="card-panel card-border teal white-text">
                            <h6>Output</h6>
                            {this.props.history.location.state.file.output}
                        </div>
                    </div>
                    <div className="col m6">
                        <div className="card-panel card-border teal white-text">
                            <h6>Expected Output</h6>
                            {this.props.history.location.state.file.actualOutput}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FinalScores