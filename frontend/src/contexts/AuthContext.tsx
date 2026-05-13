import { createContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

interface User {
  username: string;
  profile_picture?: string;
}

interface AuthContextData {
  token: string | null;
  user: User | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(() => {
    const tokenOnStorage = localStorage.getItem("@CloneX:token");
    if (tokenOnStorage) {
      api.defaults.headers.common["Authorization"] = `Bearer ${tokenOnStorage}`;
      return tokenOnStorage;
    }
    return null;
  });

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("@CloneX:user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function signIn(username: string, password: string) {
    try {
      const response = await api.post("token/", { username, password });
      const { access } = response.data;

      localStorage.setItem("@CloneX:token", access);
      api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      setToken(access);

      localStorage.setItem("@CloneX:user", JSON.stringify({ username }));
      setUser({ username });

      navigate("/feed");
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Usuário ou senha incorretos.");
    }
  }

  function signOut() {
    localStorage.removeItem("@CloneX:token");
    localStorage.removeItem("@CloneX:user");

    delete api.defaults.headers.common["Authorization"];

    setToken(null);
    setUser(null);

    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ token, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
