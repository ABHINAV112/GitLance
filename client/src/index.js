import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import './index.css';
import 'materialize-css';
import Home from './pages/Home';
import Solve from './pages/Solve';
import Navbar from './components/Navbar';
import * as serviceWorker from './serviceWorker';

class Routing extends React.Component {
    render() {
        return (
            <Router>
                <Navbar />
                <div>
                    <Route exact path="/home" component={Home} />
                    <Route path="/solve" component={Solve} />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<Routing />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
