import React, { Component } from 'react'

class Buy extends Component {
    render() {
        return (
            <div className="container">
                <div className="card-panel card-border teal lighten-2">
                    {/* <h4>{this.props.location.title}</h4> */}
                    {/* <h5>Amount: {this.props.location.pay}</h5> */}
                    <div className="row">
                        <button className="btn-floating btn-large left white"><i className="material-icons red-text">thumb_down</i></button>
                        <button className="btn-floating btn-large right white"><i className="material-icons green-text">thumb_up</i></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Buy;