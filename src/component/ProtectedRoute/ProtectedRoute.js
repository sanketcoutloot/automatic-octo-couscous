import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const ProtectedRoute = ({ children, ...rest }) => {
  // token can also be taken from auth reducer
  const token = useSelector(() => window.localStorage.getItem("token"));

  console.log("token ===>", token);
  return (
    <Route
      {...rest}
      render={() => {
        return token ? children : <Redirect to="/" />;
      }}
    />
  );
};
export default ProtectedRoute;
