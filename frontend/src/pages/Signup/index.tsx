import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { Eye, EyeOff, Feather } from "lucide-react";
import {
  Container,
  LoginBox,
  Title,
  Input,
  PrimaryButton,
  LinksContainer,
  NavLink,
  XLogo,
  PasswordWrapper,
  EyeButton,
} from "./styles";

export function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        email,
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
        <XLogo>
          <Feather size={40} />
        </XLogo>

        <Title>
          Inscreva-se no <Feather size={20} />
        </Title>

        <Input
          type="text"
          placeholder="Escolha um nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Input
          type="email"
          placeholder="Digite seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <PasswordWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Crie uma senha forte"
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

        <PasswordWrapper>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme a sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              width: "100%",
              paddingRight: "45px",
              boxSizing: "border-box",
            }}
          />
          <EyeButton
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </EyeButton>
        </PasswordWrapper>

        <PrimaryButton type="submit">Criar Conta</PrimaryButton>

        <LinksContainer>
          Já tem uma conta?{" "}
          <NavLink onClick={() => navigate("/login")}>Entrar</NavLink>
        </LinksContainer>
      </LoginBox>
    </Container>
  );
}
