import React, { Component } from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

class ScoreCard extends Component {
    render(props) {
        return (
            <div className="card-panel scorecard white-text">
                <div className="row">
                    <div className="col m7">
                        <div className="row">
                            <h4>{this.props.title}</h4>
                            <div className="col m5">
                                <h5>Run Time</h5>
                            </div>
                            <div className="col m5">
                                <div className="progress-align">
                                    <Progress percent={this.props.runtime} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col m5">
                                <h5>Memory</h5>
                            </div>
                            <div className="col m5">
                                <div className="progress-align">
                                    <Progress percent={this.props.memory} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col m5">
                                <h5>Efficiency</h5>
                            </div>
                            <div className="col m5">
                                <div className="progress-align">
                                    <Progress percent={this.props.efficiency} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col m5">
                        <h4>Overall Score</h4>
                        <div className="circle-align">
                            <Progress
                                type="circle"
                                percent={this.props.overall}
                            />
                        </div>
                        <button className="waves-effect waves-light btn right">Submit</button>
                    </div>
                </div>
            </div >
        )
    }
}

export default ScoreCard;