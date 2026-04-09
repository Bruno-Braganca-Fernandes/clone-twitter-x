import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { api } from "../../services/api";
import {
  FeedContainer,
  Header,
  BackButton,
  ProfileDetails,
  ProfileHeaderRow,
  Avatar,
  FollowButton,
  ProfileName,
  ProfileUsername,
  BioText,
  StatsContainer,
} from "./styles";

interface UserProfile {
  id: number;
  username: string;
  followers_count: number;
  following_count: number;
  bio: string | null;
  is_following: boolean;
  profile_picture: string | null;
}

export function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await api.get(`users/${username}/`);
        setProfile(response.data);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        alert("Usuário não encontrado!");
        navigate("/feed");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [username, navigate]);

  async function handleFollowToggle() {
    if (!profile) return;

    try {
      const action = profile.is_following ? "unfollow" : "follow";
      await api.post(`users/${profile.username}/${action}/`);

      setProfile((prevProfile) => {
        if (!prevProfile) return null;
        const followersChange = prevProfile.is_following ? -1 : 1;
        return {
          ...prevProfile,
          is_following: !prevProfile.is_following,
          followers_count: prevProfile.followers_count + followersChange,
        };
      });
    } catch (error) {
      console.error("Erro ao alterar follow status:", error);

      if (isAxiosError(error) && error.response?.data?.detail) {
        alert(error.response.data.detail);
      } else {
        alert("Erro ao processar ação de seguir.");
      }
    }
  }

  if (loading) {
    return (
      <p style={{ color: "#71767b", textAlign: "center", marginTop: "50px" }}>
        Carregando perfil...
      </p>
    );
  }

  return (
    <FeedContainer>
      <Header>
        <BackButton onClick={() => navigate("/feed")}>←</BackButton>
        <div>
          <h1>{profile?.username}</h1>
          <span style={{ color: "#71767b", fontSize: "13px" }}>
            {profile?.followers_count} Seguidores
          </span>
        </div>
      </Header>

      <ProfileDetails>
        <ProfileHeaderRow>
          {/* Se o usuário tiver foto, mostra a imagem. Se não tiver, mostra o círculo vazio */}
          {profile?.profile_picture ? (
            <img
              src={profile.profile_picture}
              alt="Foto de perfil"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid black",
              }}
            />
          ) : (
            <Avatar />
          )}
          <FollowButton
            onClick={handleFollowToggle}
            $isFollowing={profile?.is_following}
          >
            {profile?.is_following ? "Seguindo" : "Seguir"}
          </FollowButton>
        </ProfileHeaderRow>

        <ProfileName>{profile?.username}</ProfileName>
        <ProfileUsername>@{profile?.username}</ProfileUsername>

        {profile?.bio && <BioText>{profile.bio}</BioText>}

        <StatsContainer>
          <span>
            <strong>{profile?.following_count}</strong> Seguindo
          </span>
          <span>
            <strong>{profile?.followers_count}</strong> Seguidores
          </span>
        </StatsContainer>
      </ProfileDetails>
    </FeedContainer>
  );
}
