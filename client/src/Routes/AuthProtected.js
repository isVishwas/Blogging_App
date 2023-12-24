import React from "react";
import { Navigate, Route } from "react-router-dom";
import { getToken, setAuthorization } from "../helpers/api_helper";

const AuthProtected = (props) => {

  if (!getToken()) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  if (getToken()) {
      setAuthorization(getToken());
      return <>{props.children}</>;
  }
};


const AccessRoute = (props) => {
  return <>{props.children}</>;
};

export { AuthProtected, AccessRoute };