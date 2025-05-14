import { Navigate } from "react-router-dom";
import type { ProtectedRouteProps } from "../types/interface";

export const Protected = ({
  isAuthenticated,
  redirectPath = "/login",
  children,
}: ProtectedRouteProps) => {
  return isAuthenticated ? children : <Navigate to={redirectPath} replace />;
};
