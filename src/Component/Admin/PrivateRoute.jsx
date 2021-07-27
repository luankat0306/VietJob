import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../../services/AuthService";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("user"));

    if (token && token.roles.includes("ROLE_ADMIN")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    // eslint-disable-next-line
  }, []);

  if (isAuthenticated === null) {
    return <></>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
