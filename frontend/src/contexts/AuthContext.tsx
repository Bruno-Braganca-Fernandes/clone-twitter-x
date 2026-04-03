import { createContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

interface AuthContextData {
  token: string | null;
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

  async function signIn(username: string, password: string) {
    try {
      const response = await api.post("token/", { username, password });
      const { access } = response.data;

      localStorage.setItem("@CloneX:token", access);

      api.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      setToken(access);
      navigate("/feed");
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Usuário ou senha incorretos.");
    }
  }

  function signOut() {
    localStorage.removeItem("@CloneX:token");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
