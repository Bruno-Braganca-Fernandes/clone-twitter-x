import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { HeaderContainer, BackButton, UserInfo } from "./styles";

interface ProfileHeaderProps {
  username: string;
  followersCount: number;
}

export function ProfileHeader({
  username,
  followersCount,
}: ProfileHeaderProps) {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <BackButton onClick={() => navigate(-1)} title="Voltar">
        <ArrowLeft size={20} />
      </BackButton>

      <UserInfo>
        <h2>{username}</h2>
        <span>
          {followersCount} {followersCount === 1 ? "Seguidor" : "Seguidores"}
        </span>
      </UserInfo>
    </HeaderContainer>
  );
}
