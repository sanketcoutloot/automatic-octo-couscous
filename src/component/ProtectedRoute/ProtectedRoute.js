import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Layout } from "../Layout.js";

const ProtectedRoute = ({ component, children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (isAuthenticated) {
          return <Layout children={component} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
