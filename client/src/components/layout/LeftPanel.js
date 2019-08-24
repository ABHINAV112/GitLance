import React, { Component } from 'react';
import CheckList from './CheckList';
import './LeftPanel.css';

class LeftPanel extends Component {
    
    render() {
        return(
            <div className="card-panel border-correction teal">
                <h6 className="center-align white-text">Skill</h6>
                <hr />
                <CheckList name="Shiv" />
            </div>
        )
    }
}

export default LeftPanel;