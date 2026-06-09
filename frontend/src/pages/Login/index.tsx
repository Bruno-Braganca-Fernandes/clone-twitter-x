import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import {
  Container,
  LoginBox,
  Title,
  Input,
  PrimaryButton,
  OutlineButton,
  LinksContainer,
  NavLink,
  XLogo,
  PasswordWrapper,
  EyeButton,
} from "./styles";

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(event: React.SyntheticEvent) {
    event.preventDefault();
    await signIn(username, password);
  }

  return (
    <Container>
      <LoginBox onSubmit={handleLogin}>
        <XLogo>X</XLogo>
        <Title>Entrar no X</Title>
        <Input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <PasswordWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              paddingRight: "45px",
              boxSizing: "border-box",
            }}
          />
          <EyeButton
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </EyeButton>
        </PasswordWrapper>
        <PrimaryButton type="submit">Avançar</PrimaryButton>
        <OutlineButton
          type="button"
          onClick={() => navigate("/forgot-password")}
        >
          Esqueceu a senha?
        </OutlineButton>
        <LinksContainer>
          Não tem uma conta?{" "}
          <NavLink onClick={() => navigate("/signup")}>Inscreva-se</NavLink>
        </LinksContainer>
      </LoginBox>
    </Container>
  );
}
