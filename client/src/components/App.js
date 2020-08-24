import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
    componentDidMount() {
        // The 'connect' function in the export default section is connecting the action creators
        // to this class, and all those actions are then passed as props in this class 
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                {/* BrowserRouter can only have 1 child */}
                    <div>
                        {/* Header is always visible */}
                        <Header />
                        {/* <Route exact={true} path="/" component={Landing} /> Reduced to: */}
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
export default connect(null, actions)(App);