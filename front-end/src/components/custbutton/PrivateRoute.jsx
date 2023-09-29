// PrivateRoute.js
import React from "react";
import { Route, Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase";

function PrivateRoute() {
  const user = auth.currentUser;
  return user ? <Outlet /> : <Navigate to="/" />;
//   if (!user) {
//     // If user is not logged in, show alert and navigate to login page
//     <Navigate to="/" />
//     alert("Please login");
   
//     return null; // Return null to prevent rendering anything in this case
//   }

//   return <Outlet />;


}

export default PrivateRoute;
