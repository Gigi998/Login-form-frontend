import { useLocation, Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useAuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuthContext();
  const location = useLocation();

  // Decode accessTOken
  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;

  // FInd roles
  const roles = decoded?.UserInfo?.roles || [];

  return roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    // If user doesnot have permission then redirect user to unauth page
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default RequireAuth;
