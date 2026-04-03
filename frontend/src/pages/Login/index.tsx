import { useState } from "react";
import { Container, LoginBox, Title, Input, Button } from "./styles";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log("Dados prontos para o Axios:", { username, password });
  }

  return (
    <Container>
      <LoginBox onSubmit={handleLogin}>
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

        <Button type="submit">Entrar</Button>
      </LoginBox>
    </Container>
  );
}
