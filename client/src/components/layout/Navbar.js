import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import LoggedInLinks from '../auth/LoggedInLinks';
import LoggedOutLinks from '../auth/LoggedOutLinks';
import { connect } from 'react-redux';


class Navbar extends Component {
    state = {
        balance: ""
    }
    componentDidMount() {
        var fetch = require("node-fetch");

        const { auth } = this.props;

        var options = {
            method: 'POST',
            url: 'https://git-lance.firebaseapp.com/api/payment/checkBalance',
            headers:
            {
                'Postman-Token': '26f87995-73a1-4979-a9e6-85e9e20d518e',
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: auth.uid }),
            json: true
        };

        fetch(options.url, options).then(res => res.json()).then(res => {
            this.setState({
                balance: res.money
            })
        })

    }
    render(props) {
        const { auth } = this.props
        // (auth)
        const links = auth.uid ? <LoggedInLinks balance={this.state.balance} /> : <LoggedOutLinks />
        return (
            <nav className="nav-wrapper grey darken-3">
                <div className="container">
                    <Link to='/home' className="brand-logo">GitLance</Link>
                    {links}
                </div>
            </nav>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar);
