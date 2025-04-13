//midleware
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticateAndRolesMiddleware = ({ fallbackPath,module }) => {
//   const isAuthenticated = sessionStorage.getItem("isAuthenticated");
const isAuthenticated = JSON.parse(localStorage.getItem("user_details"));
//   const Permission = useSelector(
//     (state) => state?.cloudstratCustomer?.loginUserDetails?.role?.permissions
//   );
console.log("auth : ",isAuthenticated)
  if (isAuthenticated?.is_logged_in) {
      return <Outlet />
    } else {
      return <Navigate to={fallbackPath} />;
    }
//    else {
//     if (isAuthenticated === "true") {
//       return <Outlet />;
//     } else {
//       return <Navigate to={fallbackPath} />;
//     }
//   }
};

export default AuthenticateAndRolesMiddleware;