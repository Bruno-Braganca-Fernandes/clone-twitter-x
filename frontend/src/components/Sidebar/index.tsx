import {
  SidebarContainer,
  NavItem,
  LogoContainer,
  LogoutNavItem,
  UserCard,
  UserAvatar,
  UserDetails,
  UserName,
  UserHandle,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Home, User, LogOut, Feather, Search } from "lucide-react";

export function Sidebar() {
  const navigate = useNavigate();
  const { user, signOut } = useContext(AuthContext);

  return (
    <SidebarContainer>
      <LogoContainer onClick={() => navigate("/feed")}>
        <Feather size={32} />
      </LogoContainer>

      <nav>
        <NavItem onClick={() => navigate("/feed")}>
          <Home size={28} />
          <span>Página Inicial</span>
        </NavItem>

        <NavItem onClick={() => navigate("/explore")}>
          <Search size={28} />
          <span>Explorar</span>
        </NavItem>

        <NavItem onClick={() => navigate(`/profile/${user?.username}`)}>
          <User size={28} />
          <span>Perfil</span>
        </NavItem>

        <LogoutNavItem onClick={signOut}>
          <LogOut size={28} />
          <span>Sair</span>
        </LogoutNavItem>
      </nav>

      <UserCard onClick={() => navigate(`/profile/${user?.username}`)}>
        <UserAvatar $bgImage={user?.profile_picture || undefined} />
        <UserDetails>
          <UserName>{user?.username}</UserName>
          <UserHandle>@{user?.username}</UserHandle>
        </UserDetails>
      </UserCard>
    </SidebarContainer>
  );
}
