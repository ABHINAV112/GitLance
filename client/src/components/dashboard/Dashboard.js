import React, { Component } from 'react';
import LeftPanel from '../layout/LeftPanel';
import Notification from './Notification';

class Dashboard extends Component {
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col m3">
                        <LeftPanel />
                    </div>
                    <div className="col m7 offset-m1">
                        <Notification />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;