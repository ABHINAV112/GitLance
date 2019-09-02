import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import Workspace from './components/workspace/Workspace';
import Navbar from './components/layout/Navbar';
import * as serviceWorker from './serviceWorker';


const routing = (
    <Router>
        <Navbar />
        <div>
            <Route exact path="/" component={App} />
            <Route path="/workspace" component={Workspace} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
