import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import {
  Container,
  LoginBox,
  Title,
  Input,
  PrimaryButton,
  LinksContainer,
  NavLink,
  XLogo,
} from "./styles";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignup(event: React.SyntheticEvent) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem. Tente novamente!");
      return;
    }

    try {
      await api.post("users/", {
        username,
        password,
      });

      alert("Conta criada com sucesso! Faça o login.");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      alert("Erro ao criar a conta. Talvez este nome de usuário já exista.");
    }
  }

  return (
    <Container>
      <LoginBox onSubmit={handleSignup}>
        <XLogo>X</XLogo>

        <Title>Inscreva-se no X</Title>

        <Input
          type="text"
          placeholder="Escolha um nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Crie uma senha forte"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Confirme a sua senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <PrimaryButton type="submit">Criar Conta</PrimaryButton>

        <LinksContainer>
          Já tem uma conta?{" "}
          <NavLink onClick={() => navigate("/login")}>Entrar</NavLink>
        </LinksContainer>
      </LoginBox>
    </Container>
  );
}
