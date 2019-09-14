import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
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
import { Router, withRouter } from 'react-router';
import Buy from './pages/functional/Buy'

import IssueSubs from './pages/subto/IssueSubs';
import ProblemSubs from './pages/subto/ProblemSubs';
import SubmittedProblem from './pages/subby/SubmittedProblems';
import SubmittedIssues from './pages/subby/SubmittedIssues';
import FinalScores from './pages/summary/FinalScores';



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
            <BrowserRouter history={history}>
                <Navbar />
                <div>
                    <Switch>
                        <Route exact path="/" component={withRouter(Landing)} />
                        <Route path="/issues" component={withRouter(Issues)} />
                        <Route path="/signin" component={withRouter(SignIn)} />
                        <Route path="/signup" component={withRouter(SignUp)} />
                        <Route path="/home" component={withRouter(FeedSolve)} />
                        <Route path="/profile" component={withRouter(Profile)} />
                        <Route path="/upload" component={withRouter(Upload)} />
                        <Route path="/problem" component={withRouter(Problem)} />
                        <Route path="/solissue" component={withRouter(SolveIssues)} />
                        <Route path="/solproblem" component={withRouter(SolveProblem)} />
                        <Route path="/subproblem" component={withRouter(ProblemSubs)} />
                        <Route path="/subissue" component={withRouter(IssueSubs)} />
                        <Route path="/uploaded" component={withRouter(Uploaded)} />
                        <Route path="/uploadedissues" component={withRouter(UploadedIssues)} />
                        <Route path="/uploadedproblems" component={withRouter(UploadedProblems)} />
                        <Route path="/issuesub" component={withRouter(SubmittedIssues)} />
                        <Route path="/problemsub" component={withRouter(SubmittedProblem)} />
                        <Route path="/buy" component={withRouter(Buy)} />
                        <Route path="/scorecard" component={withRouter(FinalScores)} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(<Provider store={store}><Routing /></Provider>, document.getElementById('root'));
})



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

