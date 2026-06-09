import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import {
  Container,
  LoginBox,
  XLogo,
  Title,
  Input,
  PrimaryButton,
  LinksContainer,
  NavLink,
} from "../Login/styles";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    try {
      await api.post("password-reset/", { email });
      alert(
        "Se o e-mail estiver cadastrado, você receberá um link em instantes."
      );
      navigate("/login");
    } catch (error) {
      console.error("Erro ao solicitar redefinição:", error);
      alert("Erro ao solicitar redefinição de senha. Tente novamente.");
    }
  }

  return (
    <Container>
      <LoginBox onSubmit={handleSubmit}>
        <XLogo>X</XLogo>
        <Title>Esqueceu a senha?</Title>
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PrimaryButton type="submit">Enviar link</PrimaryButton>
        <LinksContainer>
          Lembrou a senha?{" "}
          <NavLink onClick={() => navigate("/login")}>Entrar</NavLink>
        </LinksContainer>
      </LoginBox>
    </Container>
  );
}
