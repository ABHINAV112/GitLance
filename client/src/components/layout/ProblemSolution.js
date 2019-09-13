import React, { Component } from 'react'


class ProblemSolution extends Component {
    state = {
        entrypoint: "",
        language: "",
        myCode: ""
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

    handleSubmit = (e) => {
        var fetch = require("node-fetch");
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
        console.log(...formData);
        var URL = "http://compiler-env.i3hveummcp.ap-southeast-1.elasticbeanstalk.com/compile"
        fetch(URL, {
            "method": "POST",
            "body": formData
        }).then((res) => (res.json())).then(json => console.log(json));
    }


    render() {

        return (
            <div className="card-panel card-border red lighten-2 white-text">
                <div className="row">

                    {/* <h4>{this.props.data.problemHeading}</h4> */}
                    {/* <h5>Pay: ${this.props.data.pay}</h5> */}
                    <h5>Description:</h5>
                    {/* <h6>{this.props.data.problemDescription}</h6> */}
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

export default ProblemSolution