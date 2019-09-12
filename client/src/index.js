import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import './index.css';
import 'materialize-css';
import FeedSolve from './pages/solve/FeedSolve';
import Profile from './pages/aesthetics/Profile'
import Navbar from './components/layout/Navbar';
import * as serviceWorker from './serviceWorker';
import Landing from './pages/aesthetics/Landing';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import firebaseConfig from './config/firebaseConfig'
import Upload from './pages/uploads/Upload';
import history from './history'
import Problem from './pages/solve/Problem'
import Issues from './pages/solve/Issues';
import SolveIssues from './pages/workspace/SolveIssues';
import SolveProblem from './pages/workspace/SolveProblem';
import ProblemUp from './pages/subto/ProblemSubs';
import Uploaded from './pages/uploads/Uploaded';
import UploadedIssues from './pages/uploads/UploadedIssues';
import UploadedProblems from './pages/uploads/UploadedProblems';



const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reactReduxFirebase(firebaseConfig, { attachAuthIsReady: true }),
        reduxFirestore(firebaseConfig)
    )
);

class Routing extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Navbar />
                <div>
                    <Route exact path="/" component={Landing} />
                    <Route path="/issues" component={Issues} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/home" component={FeedSolve} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/upload" component={Upload} />
                    <Route path="/problem" component={Problem} />
                    <Route path="/solissue" component={SolveIssues} />
                    <Route path="/solproblem" component={SolveProblem} />
                    <Route path="/subproblem" component={ProblemUp} />
                    <Route path="/uploaded" component={Uploaded} />
                    <Route path="/uploadedissues" component={UploadedIssues} />
                    <Route path="/uploadedproblems" component={UploadedProblems} />
                </div>
            </Router>
        )
    }
}

store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(<Provider store={store}><Routing /></Provider>, document.getElementById('root'));
})



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
