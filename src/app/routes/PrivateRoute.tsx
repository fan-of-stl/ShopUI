import { Navigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext();

  console.log({user});
  
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;