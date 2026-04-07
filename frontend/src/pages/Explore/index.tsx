import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import {
  FeedContainer,
  Header,
  UserCard,
  UserAvatar,
  UserInfo,
  UserName,
  UserHandle,
} from "./styles";

interface User {
  id: number;
  username: string;
  followers_count: number;
}

export function Explore() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await api.get("users/");
        const usersList = Array.isArray(response.data)
          ? response.data
          : response.data.results;
        setUsers(usersList || []);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  return (
    <FeedContainer>
      <Header>
        <button
          onClick={() => navigate("/feed")}
          style={{
            background: "transparent",
            color: "#eff3f4",
            fontSize: "1.2rem",
            marginRight: "16px",
            cursor: "pointer",
            border: "none",
          }}
        >
          ←
        </button>
        <div>
          <h1>Explorar</h1>
        </div>
      </Header>

      {loading ? (
        <p style={{ color: "#71767b", textAlign: "center", marginTop: "20px" }}>
          Carregando...
        </p>
      ) : (
        users.map((user) => (
          <UserCard
            key={user.id}
            onClick={() => navigate(`/profile/${user.username}`)}
          >
            <UserAvatar />
            <UserInfo>
              <UserName>{user.username}</UserName>
              <UserHandle>
                @{user.username} • {user.followers_count} seguidores
              </UserHandle>
            </UserInfo>
          </UserCard>
        ))
      )}

      {!loading && users.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#71767b" }}>
          Nenhum usuário encontrado.
        </p>
      )}
    </FeedContainer>
  );
}
