import React, { Component } from 'react';

import './Tile.css';

class Tile extends Component {

    render() {
        return (
            
            <div className="card">
                <div className="row">
                    <div className="valign-wrapper">
                    <div className="col m9">
                        <h6 className="center-align white-text">ROLE</h6>
                    </div>
                    <div className="col m3">
                    <i class="material-icons right yellow-text">bookmark</i>
                    </div>
                    </div>
                    <hr />
                </div>

                
<div className="row">
                    <div className="col m5">
                        <div className="dp"></div>
                    </div>
                    <ul className="left-align white-text">
                        <li>Comapny</li>
                        <li>Salary</li>
                        <li>Place</li>
                    </ul>
                    <div className="description">
                        <h6 className="white-text" style={{fontSize: '14px'}}>Description :</h6>
                        <p className="white-text" style={{fontSize: '13px'}}>XXXXX XXXX XXXXX XXXX XXX XXXX XXXXXX XXXXXX</p>
                        <p className="white-text" style={{fontSize: '13px'}}>>Python >TensorFlow</p>
                    </div>
                    <div className="col m5">
                    <div className="ratings center-align">Rating<i class="material-icons right white-text">star_border</i></div>
                </div>
                <div className="col m7">
                    <div className="apply">APPLY</div>
                </div>
                </div> 
            </div>
        )

    }
}

export default Tile;