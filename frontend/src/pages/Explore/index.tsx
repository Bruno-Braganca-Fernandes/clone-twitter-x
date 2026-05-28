import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { api } from "../../services/api";
import { BackButton } from "../../components/ProfileHeader/styles";
import {
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
  profile_picture: string | null;
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
    <>
      <Header>
        <BackButton onClick={() => navigate(-1)} title="Voltar">
          <ArrowLeft size={20} />
        </BackButton>
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
            {user.profile_picture ? (
              <img
                src={user.profile_picture}
                alt={user.username}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <UserAvatar />
            )}
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
    </>
  );
}
