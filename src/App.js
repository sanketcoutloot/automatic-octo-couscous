import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { MoneyLogs, AllRequests } from "./pages";

import { Layout } from "./component/Layout.js";

import { UserCashoutProfile } from "./component/UserCashoutProfile";

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

            <Route render={() => <h1>PAge not found</h1>} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
