import React, { Component } from 'react'

class UpIssueTile extends Component {
    render(props) {
        return (
            <div className="container">
                <div className="card-panel teal tile white-text card hoverable">
                    <h5>{this.props.title}</h5>
                    <div className="name">
                        <h6>Name: {this.props.name}</h6>
                        {/* <p style={{ fontSize: '13px' }}>{this.props.description}</p> */}
                    </div>
                    <div className="repo">
                        <h6>Repo: {this.props.repo}</h6>
                    </div>
                    <div className="submissions">
                        <h6>Number of Submissions: {this.props.submissions}</h6>
                    </div>
                    <h6>Pay: ${this.props.pay}</h6>
                </div>
            </div>
        )
    }
}

export default UpIssueTile;