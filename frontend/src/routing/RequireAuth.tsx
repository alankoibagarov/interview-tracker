import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Dummy auth check. Replace with real logic as needed.
const isAuthenticated = () => {
  // For demo: check localStorage for a token or flag
  return !!localStorage.getItem("authToken");
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
