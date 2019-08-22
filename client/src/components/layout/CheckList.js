import React, { Component } from 'react';

class CheckList extends Component {
    render(props) {
        return(
            <form action="#">
                <p>
                    <label>
                        <input type="checkbox" className="filled-in" id="check-box" />
                        <span className="white-text">{ this.props.name }</span>
                    </label>
                </p>
            </form>
        )
    }
}

export default CheckList;