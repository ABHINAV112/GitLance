import React, { Component } from 'react';
import ScoreBar from './ScoreBar';

class ScoreCard extends Component {
    render(props) {
        return (
            <div className="card-panel scorecard white-text">
                <div className="row">
                    <div className="col m7">
                        <div className="row">
                            <div className="col m5">
                                <h5>Run Time</h5>
                            </div>
                            <div className="col m7">
                                <ScoreBar percentage='25%' color='red' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col m5">
                                <h5>Memory</h5>
                            </div>
                            <div className="col m7">
                                <ScoreBar percentage='25%' color='red' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col m5">
                                <h5>Efficiency</h5>
                            </div>
                            <div className="col m7">
                                <ScoreBar percentage='25%' color='red' />
                            </div>
                        </div>
                    </div>
                    <div className="col m5">
                        <h4>Overall Score</h4>
                    </div>
                </div>
            </div >
        )
    }
}

export default ScoreCard;