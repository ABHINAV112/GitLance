import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../../history";
import { Redirect } from "react-router-dom";

class Buy extends Component {
  handleBuy = () => {
    var fetch = require("node-fetch");
    const { auth } = this.props;

    var paymentDetails = {
      from: auth.uid,
      to: this.props.location.solverID,
      amount: this.props.location.dataProblem.pay
    };

    var options = {
      method: "POST",
      url: "https://git-lance.firebaseapp.com/api/payment/makeTransaction",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(paymentDetails),
      // {
      //     from: 'DOlzbAFrTJOxn1tYzOdWVBUkT0a2',
      //     to: 'gOQFfO6U0PXzVptg3M1ig7MBY2K3',
      //     amount: '30'
      // },
      json: true
    };
    // document.getElementById("my_iframe").src = "myCode.zip";

    fetch(options.url, options)
      .then(res => res.json())
      .then(res => {
        history.push("/uploaded");
        window.location.reload();
      });
  };

  handleReject = () => {
    ("Reject");
  };

  render() {
    if (!this.props.location.dataProblem || !this.props.location.dataSolver)
      return <Redirect to="/uploaded" />;
    return (
      <div className="container">
        <div className="buy-pos">
          <div className="card-panel card-border teal lighten-2 buy-card white-text center">
            <h4>{this.props.location.dataProblem.problemHeading}</h4>
            <h5>{this.props.location.dataSolver.solverUserName}</h5>
            <h5>Amount: {this.props.location.dataProblem.pay}</h5>
            <div className="row">
              <button
                onClick={this.handleReject}
                className="btn-floating btn-large left white"
              >
                <i className="material-icons red-text">thumb_down</i>
              </button>
              <a href="myCode.zip" download>
                <button
                  onClick={this.handleBuy}
                  className="btn-floating btn-large right white"
                >
                  <i className="material-icons green-text">thumb_up</i>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Buy);
