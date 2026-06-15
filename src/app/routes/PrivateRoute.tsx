import { Navigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";

const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: "admin" | "customer" }) => {
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/login" replace />;

   if (requiredRole === "admin" && !user.roles?.includes("ADMIN")) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole === "customer" && user.roles?.includes("ADMIN")) {
    return <Navigate to="/admin" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;