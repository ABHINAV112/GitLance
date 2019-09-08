import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import './index.css';
import 'materialize-css';
import Home from './pages/Home';
import Solve from './pages/Solve';
import Navbar from './components/layout/Navbar';
import * as serviceWorker from './serviceWorker';
import Landing from './pages/Landing';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import firebaseConfig from './config/firebaseConfig'

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase })),
        reactReduxFirebase(firebaseConfig)
    )
);

class Routing extends React.Component {
    render() {
        return (
            <Router>
                <Navbar />
                <div>
                    <Route exact path="/" component={Landing} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/home" component={Home} />
                    <Route path="/solve" component={Solve} />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<Provider store={store}><Routing /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
