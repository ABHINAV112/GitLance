import React, { Component } from 'react';
import LeftPanel from '../layout/LeftPanel';
import Tile from '../layout/Tile';


const skill = {
    one: "Python",
    two: "Unity"
}

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            itemChecked: {},
        };
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col m3">
                        <LeftPanel />
                    </div>
                    <div className="col m7 offset-m1">
                        <Tile
                            dp="https://via.placeholder.com/75"
                            company="AMD"
                            salary="2300"
                            place="Bedok"
                            description="XXXXX XXXX XXXXX XXXX XXX XXXX XXXXXX XXXXXX"
                            skill={skill}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;