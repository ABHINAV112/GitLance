import React, { Component } from 'react'


class UpProbTile extends Component {
    render(props) {
        return (
            <div className="container">
                <div className="card-panel teal tile white-text card hoverable">
                    <h5>{this.props.title}</h5>
                    <div className="description">
                        <h6>Description:</h6>
                        <p style={{ fontSize: '13px' }}>{this.props.description}</p>
                    </div>
                    <div className="score">
                        <h6>Highest Score: {this.props.score}</h6>
                    </div>
                    <div className="submissions">
                        <h6>Number of Submissions: {this.props.submissions}</h6>
                    </div>
                    <h6>Pay: ${this.props.pay}</h6>
                </div>
            </div>
        )
    }
}

export default UpProbTile