import React, { Component } from 'react';

import './Tile.css';

class Tile extends Component {

    render(props) {
        return (

            <div className="card container">
                <div className="row">
                    <div className="valign-wrapper">
                        <div className="col m9">
                            <h6 className="center-align white-text pos-header">ROLE</h6>
                        </div>
                        <div className="col m3">
                            <i className="material-icons right white-text pos-bookmark">bookmark_border</i>
                        </div>
                    </div>
                    <hr />
                </div>

                <div className="row">
                    <div className="col m5">
                        <div className="dp">
                            <img src={this.props.dp} />
                        </div>
                    </div>
                    <ul className="left-align white-text">
                        <li>Company: {this.props.company}</li>
                        <li>Salary: ${this.props.salary}</li>
                        <li>Place: {this.props.place}</li>
                    </ul>
                    <div className="description">
                        <h6 className="white-text" style={{ fontSize: '14px' }}>Description :</h6>
                        <div className="description">
                            <p className="white-text" style={{ fontSize: '13px' }}>{this.props.description}</p>
                        </div>
                    </div>
                    <div className="skills center">
                        <p className="white-text" style={{ fontSize: '18px' }}>>{this.props.skill.one} >{this.props.skill.two}</p>
                    </div>
                </div>
                <div className="center">
                    <button class="btn-small waves-effect waves-light ratings">Rate
                            <i class="material-icons right white-text">star_border</i>
                    </button>
                    <button class="btn-small waves-effect waves-light apply">Apply</button>
                </div>
            </div>
        )

    }
}

export default Tile;