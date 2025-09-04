import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    // Redirect to home or login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default RequireAuth;
