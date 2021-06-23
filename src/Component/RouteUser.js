import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

const RouteUser = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("user"));

    if (token && token.roles.includes("ROLE_USER")) {
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
    <Route {...rest} render={(props) => (!isAuthenticated ? <Redirect to="/dang-nhap" /> : <Component {...props} />)} />
  );
};

export default RouteUser;
