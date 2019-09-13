import React, { Component } from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { Link } from 'react-router-dom'

class ScoreCard extends Component {
    render(props) {

        return (
            <div className="card-panel scorecard white-text">
                <div className="row">
                    <div className="col m7">
                        <div className="row">
                            <h4>{this.props.dataProblem.data.problemHeading}</h4>
                            <h5>{this.props.dataSolver.solverUserName}</h5>
                            <div className="col m5">
                                <h5>Run Time</h5>
                            </div>
                            <div className="col m5">
                                <div className="progress-align">
                                    <Progress percent={this.props.dataSolver.scores.time % 101} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col m5">
                                <h5>Memory</h5>
                            </div>
                            <div className="col m5">
                                <div className="progress-align">
                                    <Progress percent={this.props.dataSolver.scores.memory % 101} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col m5">
                                <h5>Efficiency</h5>
                            </div>
                            <div className="col m5">
                                <div className="progress-align">
                                    <Progress percent={this.props.dataSolver.scores.efficiency % 101} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col m5">
                        <h4>Overall Score</h4>
                        <div className="circle-align">
                            <Progress
                                type="circle"
                                percent={this.props.dataSolver.scores.total % 101}
                            />
                        </div>
                        <Link to={{ pathname: "/buy", dataSolver: this.props.dataSolver, dataProblem: this.props.dataProblem.data, solverID: this.props.solverID }}><button className="waves-effect waves-light btn right">Buy</button></Link>
                    </div>
                </div>
            </div >
        )
    }
}

export default ScoreCard;