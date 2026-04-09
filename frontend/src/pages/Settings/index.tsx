import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import {
  FeedContainer,
  Header,
  SettingsForm,
  FormGroup,
  Label,
  Input,
  FileInput,
  SaveButton,
} from "./styles";

export function Settings() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      try {
        const response = await api.get("users/me/");
        setUsername(response.data.username || "");
        setBio(response.data.bio || "");
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      } finally {
        setLoading(false);
      }
    }
    loadUserData();
  }, []);

  async function handleSave(event: React.SyntheticEvent) {
    event.preventDefault();

    const formData = new FormData();

    // Só adicionamos o que o usuário preencheu
    if (username) formData.append("username", username);
    if (bio) formData.append("bio", bio);
    if (password) formData.append("password", password);
    if (profilePicture) formData.append("profile_picture", profilePicture);

    try {
      await api.patch("users/me/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Perfil atualizado com sucesso!");
      navigate(`/profile/${username}`);
    } catch (error) {
      console.error("Erro ao salvar", error);
      alert(
        "Erro ao atualizar o perfil. Talvez esse nome de usuário já exista.",
      );
    }
  }

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "20px", color: "#71767b" }}>
        Carregando...
      </p>
    );

  return (
    <FeedContainer>
      <Header>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "transparent",
            color: "#eff3f4",
            fontSize: "1.2rem",
            marginRight: "16px",
            cursor: "pointer",
            border: "none",
          }}
        >
          ←
        </button>
        <div>
          <h1>Configurações do Perfil</h1>
        </div>
      </Header>

      <SettingsForm onSubmit={handleSave}>
        <FormGroup>
          <Label>Foto de Perfil</Label>
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setProfilePicture(e.target.files[0]);
              }
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Nome de Usuário</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Bio</Label>
          <Input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Conte um pouco sobre você"
          />
        </FormGroup>

        <FormGroup>
          <Label>Nova Senha (opcional)</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Deixe em branco para manter a atual"
          />
        </FormGroup>

        <SaveButton type="submit">Salvar Alterações</SaveButton>
      </SettingsForm>
    </FeedContainer>
  );
}
