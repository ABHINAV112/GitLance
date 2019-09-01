import React, { Component, Fragment } from 'react';
import CheckList from './CheckList';
import './LeftPanel.css';
import SkillList from '../lists/SkillList';

class LeftPanel extends Component {

    render(props) {
        return (
            <div className="card-panel border-correction teal">
                <h6 className="center-align white-text">Skill</h6>
                <hr />
                <CheckList name="Python" />
            </div>
        )
    }
}

export default LeftPanel;