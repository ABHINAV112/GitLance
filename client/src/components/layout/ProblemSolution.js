import React, { Component } from 'react'

class ProblemSolution extends Component {
    render() {
        return (
            <div className="card-panel card-border red lighten-2 white-text">
                <div className="row">
                    <div className="col m7">
                        <h4>{this.props.data.problemHeading}</h4>
                        <h5>Pay: ${this.props.data.pay}</h5>
                        <h5>Description:</h5>
                        <h6>{this.props.data.problemDescription}</h6>
                    </div>
                    <div className="col m5">
                        <div className="container">

                            <div className="card-panel card-border code-up card-overflow">
                                <i className="material-icons grey-text large center-align icon-pos">cloud_upload</i>
                                <h6 className="grey-text">Upload a ZIP of your Files</h6>
                                <div className="button-pos">
                                    <input type="file" id="codeupload" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProblemSolution