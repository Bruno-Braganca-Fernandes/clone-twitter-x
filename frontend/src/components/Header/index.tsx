import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, User, LogOut } from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";

import { HeaderContainer, Title, Nav, LogoutButton } from "./styles";

export function Header() {
  const { signOut, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Title onClick={() => navigate("/feed")}>Página Inicial</Title>

      <Nav>
        <Link to="/explore">
          <Search size={20} />
          <span>Explorar</span>
        </Link>

        {user && (
          <Link to={`/profile/${user.username}`}>
            <User size={20} />
            <span>Perfil</span>
          </Link>
        )}

        <LogoutButton onClick={signOut}>
          <span>Sair</span>
          <LogOut size={18} />
        </LogoutButton>
      </Nav>
    </HeaderContainer>
  );
}
