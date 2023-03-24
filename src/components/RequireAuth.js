import { useLocation, Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useAuthContext } from "../context/AuthContext";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuthContext();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    // If user doesnot have permission then redirect user to unauth page
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default RequireAuth;
