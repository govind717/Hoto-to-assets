//midleware
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticateAndRolesMiddleware = ({ fallbackPath, module }) => {
      const dbomUserAndToken = JSON.parse(localStorage.getItem("dbomUserAndToken"))
      const isAuthenticated = dbomUserAndToken?.isAuthenticated === true && dbomUserAndToken?.token;
      if (isAuthenticated) {
            return <Outlet />;
      } else {
            return <Navigate to={fallbackPath} />;
      }
};

export default AuthenticateAndRolesMiddleware;