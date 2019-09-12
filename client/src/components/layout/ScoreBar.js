import React, { Component } from 'react'



class ScoreBar extends Component {
    render(props) {
        return (
            <div className="tracker">
                <div className="filler left" style={
                    {
                        width: this.props.percentage,
                        background: this.props.color
                    }
                }>

                </div>
            </div>
        )
    }
}

export default ScoreBar;