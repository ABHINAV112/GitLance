import React, { Component } from 'react'
import IssueSolution from '../../components/layout/IssueSolution';

class SolveIssues extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <div className="container">
                <IssueSolution
                    data={this.props.location.data}
                />
            </div>
        )
    }
}

export default SolveIssues;