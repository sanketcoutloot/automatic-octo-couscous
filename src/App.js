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

          <ProtectedRoute path="/moneylogs">
            <Layout children={<MoneyLogs />} />
          </ProtectedRoute>

          <ProtectedRoute exact path="/allrequests">
            <Layout children={<AllRequests />} />
          </ProtectedRoute>

          <ProtectedRoute exact path="/allrequests/:userId">
            <Layout children={<UserProfileDetails />} />
          </ProtectedRoute>

          <ProtectedRoute exact path="/autoPayQueue">
            <Layout children={<AutopayQueue />} />
          </ProtectedRoute>

          <ProtectedRoute exact path="/autoPayHistory">
            <Layout children={<AutopayHistory />} />
          </ProtectedRoute>

          <Route children={<ErrorPage />} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
