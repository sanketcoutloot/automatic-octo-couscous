import React from "react";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { ErrorPage, Login, UserDetails } from "./pages";

import { Layout } from "./component/Layout.js";
import { ProtectedRoute } from "./component/ProtectedRoute";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <ProtectedRoute path="/userDetails/:id">
            <Layout children={<UserDetails />} />
          </ProtectedRoute>

          <Route children={<ErrorPage />} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
