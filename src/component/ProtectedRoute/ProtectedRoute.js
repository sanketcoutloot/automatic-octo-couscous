import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const ProtectedRoute = ({ children, ...rest }) => {
  const token = useSelector((state) => state.auth.authToken);

  console.log({ token });
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
