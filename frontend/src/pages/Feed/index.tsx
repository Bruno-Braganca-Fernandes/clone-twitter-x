import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Feed() {
  const { signOut } = useContext(AuthContext);

  return (
    <div style={{ padding: "50px", color: "#e7e9ea" }}>
      <h1>Página do Feed </h1>
      <p>Você está logado e pronto para ver os posts!</p>
      <button
        onClick={signOut}
        style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}
      >
        Sair (Logout)
      </button>
    </div>
  );
}
