import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  MoneyLogs,
  AllRequests,
  UserProfileDetails,
  ErrorPage,
  AutopayHistory,
  AutopayQueue,
} from "./pages";

import { Layout } from "./component/Layout.js";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/moneylogs">
              <Layout children={<MoneyLogs />} />
            </Route>

            <Route exact path="/allrequests">
              <Layout children={<AllRequests />} />
            </Route>

            <Route exact path="/allrequests/:userId">
              <Layout children={<UserProfileDetails />} />
            </Route>

            <Route exact path="/autoPayQueue">
              <Layout children={<AutopayQueue />} />
            </Route>

            <Route exact path="/autoPayHistory">
              <Layout children={<AutopayHistory />} />
            </Route>

            <Route children={<ErrorPage />} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
