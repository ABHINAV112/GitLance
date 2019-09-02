import React, { Component } from 'react';
import CheckBox from './CheckBox';


class CheckList extends Component {
    state = { checked: false }

    handleCheckboxChange = event => {
        this.setState({ checked: event.target.checked })
        console.log('Works')
    }


    render(props) {
        return (
            <div>
                <label>
                    <CheckBox
                        checked={this.state.checked}
                        onChange={this.props.change}
                    />
                    <span className="white-text">{this.props.name}</span>
                </label>
            </div>
        )
    }
}

export default CheckList;