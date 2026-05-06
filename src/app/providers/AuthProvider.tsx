import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { JwtPayload, User } from "../../features/auth/types/authTypes";


type AuthContextType = {
  user: User;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const login = (token: string) => {
    const decoded = jwtDecode<JwtPayload>(token);

    setUser({
      email: decoded.email ?? "",
      username: decoded.sub ?? "",
      name: decoded.name ?? "",
      roles: decoded.roles ?? [],
      token,
    });

    localStorage.setItem("accessToken", token);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded.exp * 1000 < Date.now()) {
        logout();
        return;
      }
      
      setUser({
        email: decoded.email ?? "",
        username: decoded.sub ?? "",
        name: decoded.name ?? "",
        roles: decoded.roles ?? [],
        token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return context;
};