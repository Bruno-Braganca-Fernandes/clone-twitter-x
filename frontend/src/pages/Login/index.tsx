import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
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
} from "./styles";

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);

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
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <PrimaryButton type="submit">Avançar</PrimaryButton>
        <OutlineButton type="button">Esqueceu a senha?</OutlineButton>
        <LinksContainer>
          Não tem uma conta?{" "}
          <NavLink onClick={() => navigate("/signup")}>Inscreva-se</NavLink>
        </LinksContainer>
      </LoginBox>
    </Container>
  );
}
