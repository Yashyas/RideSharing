import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getInitialUser = () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData || userData === "undefined") return null;
      return JSON.parse(userData);
    } catch (e) {
      console.error("Failed to parse user:", e);
      return null;
    }
  };

  const getInitialToken = () => {
    const token = localStorage.getItem("token");
    return token && token !== "undefined" ? token : null;
  };

  const [user, setUser] = useState(getInitialUser);
  const [token, setToken] = useState(getInitialToken);

  const login = (userData, jwt) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwt);
    setUser(userData);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
