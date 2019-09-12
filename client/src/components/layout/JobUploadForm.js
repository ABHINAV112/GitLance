import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import history from '../../history'

var redirect = false;
class JobUploadForm extends Component {
    state = {
        problemHeading: "",
        problemDescription: "",
        pay: "",
        inputFile: "",
        outputFile: "",
        redirect: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.files[0]
        })
    }



    handleSubmit = (e) => {
        e.preventDefault();

        const { auth } = this.props;
        var uploadData = this.state;
        uploadData.creatorId = auth.uid;
        uploadData.creatorName = auth.displayName;
        console.log("upload data", uploadData);
        var request = require("request");
        var options = {
            method: 'POST',
            url: 'https://git-lance.firebaseapp.com/api/upload/uploadJob',
            headers:
                { 'Content-Type': 'application/json' },
            body: uploadData,
            json: true
        };
        var txtReg = /(.*?).txt/g;
        var outRes = uploadData.outputFile.name.search(txtReg);
        if (outRes === -1) {
            alert("invalid output file!")
            return;
        }
        var inRes = uploadData.inputFile.name.search(txtReg);
        if (inRes === -1) {
            alert("invalid input file!");
            return;
        }
        request(options, function (error, response, body) {
            console.log(body);
            var firebase = require("firebase");
            var storage = firebase.app().storage("gs://git-lance.appspot.com");
            var storageRef = storage.ref();
            var userRef = storageRef.child(uploadData.creatorId)
            var jobRef = userRef.child(body.jobId);
            var inputRef = jobRef.child('input');
            var outputRef = jobRef.child('output');
            outputRef.put(uploadData.outputFile);
            inputRef.put(uploadData.inputFile);
            // this.renderRedirect();
            // redirect = true;
            history.push('/home')
            window.location.reload()
        });
    }

    render(state) {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        // if (redirect) {
        //     console.log("gonna redirect biatchh");
        //     return <Redirect to='/home' />
        // }

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">
                        Job Upload Form
                    </h5>
                    <div className="input-field">
                        <label htmlFor="problemHeading">problemHeading</label>
                        <input type="text" id="problemHeading" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="problemDescription">problemDescription</label>
                        <input type="text" id="problemDescription" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="pay">Pay</label>
                        <input type="number" id="pay" onChange={this.handleChange} />
                    </div>
                    <div className="row">
                        <div className="input-field col m6">
                            <label >Input Test File</label>
                            <input type="file" id="inputFile" onChange={this.onChangeHandler} />
                        </div>
                        <div className="input-field col m6">
                            <label>Output Test File</label>
                            <input type="file" id="outputFile" onChange={this.onChangeHandler} />
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

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(JobUploadForm);