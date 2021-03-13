import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {
  MoneyLogs,
  AllRequests,
  UserProfileDetails,
  ErrorPage,
  AutopayHistory,
  AutopayQueue,
  Login,
} from "./pages";

import { Layout } from "./component/Layout.js";
import { ProtectedRoute } from "./component/ProtectedRoute";
import { useSelector } from "react-redux";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          {/* <Route exact path="/moneylogs"> */}
          {/* <Layout children={<MoneyLogs />} /> */}
          {/* </Route> */}

          <ProtectedRoute path="/moneylogs">
            <Layout children={<MoneyLogs />} />
          </ProtectedRoute>

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
};

export default App;
