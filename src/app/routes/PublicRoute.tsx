import { Navigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext();

  return user ? <Navigate to="/" replace /> : <>{children}</>;
};

export default PublicRoute;