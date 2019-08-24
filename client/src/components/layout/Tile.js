import React, { Component } from 'react';

import './Tile.css';

class Tile extends Component {

    render() {
        return (
            <div className="card">

                <h6 className="center-align white-text">Profile</h6>
                <hr />

                <div className="row">
                    <div className="col m5">
                        <div className="dp">
                        </div>
                    </div>

                    <ul className="left-align white-text">
                        <li>Comapny</li>
                        <li>Salary</li>
                        <li>Place</li>
                    </ul>
                    <div className="description">
                        <h6 className="white-text">Description :</h6>
                        <p className="white-text">XXXXX XXXX XXXXX XXXX XXX XXXX XXXXXX XXXXXX</p>
                    </div>
                </div>
            </div>
        )

    }
}

export default Tile;