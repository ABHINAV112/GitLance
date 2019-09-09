import React, { Component } from 'react'

class JobUploadForm extends Component {
    state = {
        title: "",
        description: "",
        pay: ""
    }

    handleChange = (e) => {
        console.log(e)
    }

    handleSubmit = (e) => {
        console.log(e)
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">
                        Job Upload Form
                    </h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="pay">Pay</label>
                        <input type="number" id="pay" onChange={this.handleChange} />
                    </div>
                    <div className="row">
                        <div className="input-field col m6">
                            <label >Input Test File</label>
                            <input type="file" id="input-test-file" onChange={this.handleChange} />
                        </div>
                        <div className="input-field col m6">
                            <label>Output Test File</label>
                            <input type="file" id="output-test-file" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="input-field">
                        <button className="btn teal lighten-1 z-depth-0 center-align">Upload Job</button>
                    </div>
                </form>
            </div >
        )
    }
}

export default JobUploadForm;