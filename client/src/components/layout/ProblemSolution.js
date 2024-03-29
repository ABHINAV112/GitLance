import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../../history";
import firebase from "../../config/firebaseConfig";
var $ = require("jquery");
class ProblemSolution extends Component {
    state = {
        entrypoint: "",
        language: "",
        myCode: "",
        jsonData: ""
    };
    constructor(props) {
        super(props);
        console.log("constructor ran");
        if (props.data == undefined) {
            this.props2 = JSON.parse(localStorage.getItem("solutionData"));
            console.log("if ran");
        } else {
            localStorage.setItem("solutionData", JSON.stringify(this.props));
            this.props2 = this.props;
            console.log("else ran");
        }
        var storageRef = firebase.storage().ref();
    }
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    onChangeHandler = e => {
        this.setState({
            [e.target.id]: e.target.files[0]
        });
    };

    makeScore = (input, response) => {
        var testCaseScore = this.calculateOutput(
            input["output"].split("\n"),
            response["stdout"].split("\n")
        );
        if (testCaseScore == 0) {
            return {
                memory: 0,
                time: 0,
                efficiency: 0,
                total: 0
            };
        }
        var timeScore = Math.round(
            (1 - response["timeTaken"] / input["time"]) * 100
        );
        if (timeScore < 0) {
            timeScore = 0;
        }
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
    };

    calculateOutput = (arr1, arr2) => {
        // console.log(arr1, arr2);
        var matches = 0;
        arr1 = this.clean(arr1);
        arr2 = this.clean(arr2);
        // console.log(arr1, arr2);
        if (arr1.length == 0) {
            return 0;
        }
        for (var i = 0; i < arr1.length; i++) {
            if (arr2[i]) {
                // console.log(arr1[i] == arr2[i]);
                var str1 = this.cleanStr(arr1[i]);
                var str2 = this.cleanStr(arr2[i]);
                // console.log(str1.length, str2.length);
                // console.log(str1, str2);
                // console.log(str1 == str2);
                // for (var j = 0; j < arr1[i].length; j++) {
                //   console.log(arr1[i].charCodeAt(j), arr2[i][j]);
                //   //   console.log(arr1[i] == "");
                // }
                if (str1 == str2) {
                    matches += 1;
                }
            }
        }
        return Math.round((matches / arr1.length) * 100);
    };
    cleanStr = str => {
        var cleaned = "";
        for (var i = 0; i < str.length; i++) {
            if (str[i].charCodeAt(0) != 13) {
                cleaned += str[i];
            }
        }
        return cleaned;
    };
    clean = arr => {
        var cleanArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != "") {
                cleanArr.push(arr[i]);
            }
        }
        return cleanArr;
    };

    convert = memory => {
        var m = memory.split(" ");
        var num = parseInt(m[0]);
        var unit = m[1];

        var conv = { KB: 1024, MB: 1048576, GB: 1073741, B: 1 };
        var converted = num * conv[unit];
        return converted;
    };

    handleSubmit = e => {
        const { auth } = this.props2;
        var fetch = require("node-fetch");
        // var input = {
        //     output: this.props2.data.outputString,
        //     memory: this.props2.data.memoryLimit,
        //     time: this.props2.data.timeLimit
        // }

        var input = {
            output: this.props2.data.outputString,
            memory: this.props2.data.memoryLimit,
            time: this.props2.data.timeLimit
        };

        var solutionUpload;

        e.preventDefault();
        var formData = new FormData(e.target);
        // formData.append("entrypoint", this.state.entrypoint);
        // formData.append("language", this.state.language);
        // formData.append("myCode", this.state.myCode);
        // // formData.append("",this.props2.inputString);
        formData.append("input_text", this.props2.data.inputString);
        // const config = {
        //     headers: { 'content-type': 'multipart/form-data' }
        // }

        var possibleLang = ["python", "C", "C++", "java"];
        if (possibleLang.indexOf(formData.get("language")) == -1) {
            alert("Please enter a valid language");
            return;
        } else if (formData.get("entrypoint") == "") {
            alert("Please enter an entry point");
            return;
        } else if (formData.get("myCode").name.indexOf(".zip") == -1) {
            alert("Please upload a zip file!");
            return;
        }
        var output = {
            output: "",
            actualOutput: input.output
        };
        // var formData = $(e.target).serialize();
        console.log(...formData);
        var URL =
            "http://compiler-env.i3hveummcp.ap-southeast-1.elasticbeanstalk.com/compile";
        var options = {
            method: "POST",
            body: formData
        };

        var request = require("request");
        fetch(URL, options)
            .then(res => res.json())
            .then(json => {
                // console.log(json);
                solutionUpload = {
                    creatorId: this.props2.data.creatorId,
                    jobId: this.props2.data.jobId,
                    solverId: auth.uid,
                    solverUserName: auth.displayName
                };
                // console.log(Object.keys(json));
                if (json["stdout"]) {
                    solutionUpload.scores = this.makeScore(input, json);
                    output["output"] = json["stdout"];
                } else {
                    solutionUpload.scores = {
                        memory: 0,
                        time: 0,
                        efficiency: 0
                    };
                    output["output"] = json["error"];
                }
                var myCode = this.state.myCode;

                var options = {
                    method: "POST",
                    url:
                        "https://git-lance.firebaseapp.com/api/solve/submission/problem",
                    headers: {
                        "cache-control": "no-cache",
                        Connection: "keep-alive",
                        "Content-Length": "240",
                        "Accept-Encoding": "gzip, deflate",
                        Host: "git-lance.firebaseapp.com",
                        "Postman-Token":
                            "04d1ca07-a2a5-4890-897f-f24548833e48,bcb07d68-5403-481e-b6af-caeda39a7ff6",
                        "Cache-Control": "no-cache",
                        Accept: "*/*",
                        "User-Agent": "PostmanRuntime/7.16.3",
                        "Content-Type": "application/json"
                    },
                    body: solutionUpload,
                    json: true
                };
                console.log(solutionUpload.scores);
                request(options, function(error, response, body) {
                    if (body === "success") {
                        setTimeout(function() {
                            history.push({
                                pathname: "/scorecard",
                                state: {
                                    scores: solutionUpload.scores,
                                    file: output
                                }
                            });
                            window.location.reload();
                        }, 3000);
                    }
                });
            });
    };

    render(props) {
        return (
            <div className="card-panel card-border red lighten-2 white-text">
                <div className="row">
                    <h4>{this.props2.data.problemHeading}</h4>
                    <h5>Pay: ${this.props2.data.pay}</h5>
                    <div className="row">
                        <div className="col m4">
                            <h5>Description:</h5>
                        </div>
                        <div className="col m8">
                            <h6>{this.props2.data.problemDescription}</h6>
                        </div>
                    </div>
                    <form
                        onSubmit={this.handleSubmit}
                        method="post"
                        encType="multipart/form-data"
                    >
                        <div className="input-field">
                            <label className="white-text" htmlFor="entrypoint">
                                Enter entrypoint
                            </label>
                            <input
                                type="text"
                                id="entrypoint"
                                name="entrypoint"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label className="white-text" htmlFor="language">
                                Enter language (python, C, C++, java)
                            </label>
                            {/* <select name="language" id="language" onChange={this.handleChange}>
                                <option value="python">Python</option>
                                <option value="C">C</option>
                                <option value="C++">C++</option>
                                <option value="java">Java</option>
                            </select> */}
                            <input
                                type="text"
                                id="language"
                                name="language"
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="input-field col m6">
                            <h6 className="white-text">Input your code here</h6>
                            <input
                                type="file"
                                id="myCode"
                                name="myCode"
                                onChange={this.onChangeHandler}
                            />
                        </div>
                        <div className="input-field btn-pos-cor">
                            <button className="btn teal lighten-1 z-depth-0 right">
                                Upload Solution
                            </button>
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
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    };
};

export default connect(mapStateToProps)(ProblemSolution);
