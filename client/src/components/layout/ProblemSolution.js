import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../history'


class ProblemSolution extends Component {
    state = {
        entrypoint: "",
        language: "",
        myCode: "",
        jsonData: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }


    onChangeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.files[0]
        })
    }

    makeScore = (input, response) => {
        var testCaseScore = this.calculateOutput(
            input["output"].split("\n"),
            response["stdout"].split("\n")
        );
        var timeScore = Math.round((1 - response["timeTaken"] / input["time"]) * 100);
        if (timeScore < 0) {
            timeScore = 0;
        }
        //   console.log(convert(response["memory"]));
        var memScore = Math.round(
            (1 - this.convert(response["memory"]) / input["memory"]) * 100
        );
        if (memScore < 0) {
            memScore = 0;
        }
        return {
            memory: memScore,
            time: timeScore,
            efficiency: testCaseScore,
            total: Math.round((memScore + timeScore + testCaseScore) / 3)
        };
    }

    calculateOutput = (arr1, arr2) => {
        var matches = 0;
        for (var i = 0; i < arr1.length; i++) {
            if (arr2[i]) {
                if (arr1[i] == arr2[i]) {
                    matches += 1;
                }
            }
        }
        return Math.round((matches / arr1.length) * 100);
    }
    convert = (memory) => {
        var m = memory.split(" ");
        //   console.log(m);
        var num = parseInt(m[0]);
        var unit = m[1];

        var conv = { KB: 1024, MB: 1048576, GB: 1073741, B: 1 };
        var converted = num * conv[unit];
        return converted;
    }

    handleSubmit = (e) => {
        const { auth } = this.props;
        var fetch = require("node-fetch");
        // var input = {
        //     output: this.props.data.outputString,
        //     memory: this.props.data.memoryLimit,
        //     time: this.props.data.timeLimit
        // }

        console.log(this.props.data)

        var input = {
            output: this.props.data.outputString,
            memory: this.props.data.memoryLimit,
            time: this.props.data.timeLimit
        }

        var solutionUpload;

        e.preventDefault();
        var formData = new FormData(e.target);
        // formData.append("entrypoint", this.state.entrypoint);
        // formData.append("language", this.state.language);
        // formData.append("myCode", this.state.myCode);
        // // formData.append("",this.props.inputString);
        formData.append("input_text", this.props.data.inputString);
        // const config = {
        //     headers: { 'content-type': 'multipart/form-data' }
        // }
        var output = {
            output: "",
            actualOutput: input.output
        }
        console.log(...formData);
        var URL = "http://compiler-env.i3hveummcp.ap-southeast-1.elasticbeanstalk.com/compile"
        fetch(URL, {
            "method": "POST",
            "body": formData
        }).then((res) => (res.json())).then(json => {
            console.log(json)
            console.log(this.makeScore(input, json))
            solutionUpload = {
                creatorId: this.props.data.creatorId,
                jobId: this.props.data.jobId,
                solverId: auth.uid,
                solverUserName: auth.displayName,
                scores: this.makeScore(input, json)
            }
            output.output = json.stdout;
            var request = require("request")

            var options = {
                method: 'POST',
                mode: 'no-cors',
                url: 'https://git-lance.firebaseapp.com/api/solve/submission/problem',
                headers:
                {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: solutionUpload
            }

            request(options, function (error, response, body) {

                console.log(body);
                console.log(solutionUpload.scores)
                // history.push({
                //     pathname: "/scorecard",
                //     state: {
                //         scores: solutionUpload.scores,
                //         file: output
                //     }
                // })
                // window.location.reload()
            });
        });



        // request(options, function (error, response, body) {
        //     if (error) throw new Error(error);

        //     console.log(body);
        // });
    }


    render() {
        console.log(this.props.data)
        return (
            <div className="card-panel card-border red lighten-2 white-text">
                <div className="row">

                    <h4>{this.props.data.problemHeading}</h4>
                    <h5>Pay: ${this.props.data.pay}</h5>
                    <div className="row">
                        <div className="col m4">
                            <h5>Description:</h5>
                        </div>
                        <div className="col m8">
                            <h6>{this.props.data.problemDescription}</h6>
                        </div>

                    </div>
                    <form onSubmit={this.handleSubmit} method="post" encType="multipart/form-data">
                        <div className="input-field">
                            <label className="white-text" htmlFor="entrypoint">Enter entrypoint</label>
                            <input type="text" id="entrypoint" name="entrypoint" onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className="white-text" htmlFor="language">Enter language</label>
                            {/* <select name="language" id="language" onChange={this.handleChange}>
                                <option value="python">Python</option>
                                <option value="C">C</option>
                                <option value="C++">C++</option>
                                <option value="java">Java</option>
                            </select> */}
                            <input type="text" id="language" name="language" onChange={this.handleChange} />
                        </div>

                        <div className="input-field col m6">
                            <h6 className="white-text">Input your code here</h6>
                            <input type="file" id="myCode" name="myCode" onChange={this.onChangeHandler} />
                        </div>
                        <div className="input-field btn-pos-cor">
                            <button className="btn teal lighten-1 z-depth-0 right">Upload Solution</button>
                        </div>
                    </form>
                </div>
                {/* <div className="col m5">
                        <div className="container">

                            <div className="card-panel card-border code-up card-overflow">
                                <i className="material-icons grey-text large center-align icon-pos">cloud_upload</i>
                                <h6 className="grey-text">Upload a ZIP of your Files</h6>
                                <div className="button-pos">
                                    
                                </div>
                            </div>
                        </div>
                    </div> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(ProblemSolution)