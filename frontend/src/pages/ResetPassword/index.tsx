import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
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
  PasswordWrapper,
  EyeButton,
} from "../Login/styles";

export function ResetPassword() {
  const navigate = useNavigate();
  const { uid, token } = useParams<{ uid: string; token: string }>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem. Tente novamente!");
      return;
    }

    try {
      await api.post("password-reset-confirm/", {
        uidb64: uid,
        token,
        new_password: password,
      });
      alert("Senha redefinida com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);

      const err = error as {
        response?: {
          data?: {
            new_password?: string[];
            detail?: string;
          };
        };
      };

      if (err.response?.data?.new_password) {
        alert("Atenção: " + err.response.data.new_password[0]);
      } else if (err.response?.data?.detail) {
        alert(err.response.data.detail);
      } else {
        alert("Link inválido ou expirado. Solicite um novo link.");
      }
    }
  }

  return (
    <Container>
      <LoginBox onSubmit={handleSubmit}>
        <XLogo>X</XLogo>
        <Title>Criar nova senha</Title>

        <PasswordWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Nova senha"
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
            placeholder="Confirme a nova senha"
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

        <PrimaryButton type="submit">Redefinir senha</PrimaryButton>

        <LinksContainer>
          Lembrou a senha?{" "}
          <NavLink onClick={() => navigate("/login")}>Entrar</NavLink>
        </LinksContainer>
      </LoginBox>
    </Container>
  );
}
