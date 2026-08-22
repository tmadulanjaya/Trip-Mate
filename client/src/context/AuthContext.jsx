import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: replace with real API call — authService.getMe()
    const token = localStorage.getItem("tripmate_token");
    if (token) {
      setUser({ id: "u1", name: "Pasindu", avatar: "P", email: "malshanpasindu490@gmail.com" });
    }
    setLoading(false);
  }, []);

  function login(userData) { setUser(userData); }
  function logout()        { setUser(null); localStorage.removeItem("tripmate_token"); }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
