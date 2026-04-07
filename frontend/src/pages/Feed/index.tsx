import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
  FeedContainer,
  Header,
  LogoutButton,
  PostCard,
  AuthorName,
  PostContent,
  PostActions,
  TweetForm,
  TweetInput,
  TweetButtonContainer,
  TweetButton,
  ActionButton,
} from "./styles";

interface Post {
  id: number;
  author_username: string;
  content: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
}

export function Feed() {
  const { signOut } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const [newPostContent, setNewPostContent] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await api.get("posts/feed/");
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao carregar o feed:", error);
      }
    }
    loadPosts();
  }, []);

  async function handleCreatePost(event: React.SyntheticEvent) {
    event.preventDefault();

    if (!newPostContent.trim()) return;

    try {
      const response = await api.post("posts/", { content: newPostContent });

      setPosts((prevPosts) => [response.data, ...prevPosts]);

      setNewPostContent("");
    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Erro ao publicar o post.");
    }
  }

  async function handleLike(postId: number) {
    try {
      const response = await api.post(`posts/${postId}/like/`);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, likes_count: response.data.likes_count }
            : post,
        ),
      );
    } catch (error) {
      console.error("Erro ao curtir post:", error);
    }
  }

  return (
    <FeedContainer>
      <Header>
        <h1>Página Inicial</h1>
        <div style={{ display: "flex", gap: "16px" }}>
          <button
            onClick={() => navigate("/explore")}
            style={{
              background: "transparent",
              color: "#1d9bf0",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Explorar 🔍
          </button>
          <LogoutButton onClick={signOut}>Sair</LogoutButton>
        </div>
      </Header>

      <TweetForm onSubmit={handleCreatePost}>
        <TweetInput
          placeholder="O que está acontecendo?"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          maxLength={280}
        />
        <TweetButtonContainer>
          <TweetButton type="submit" disabled={!newPostContent.trim()}>
            Postar
          </TweetButton>
        </TweetButtonContainer>
      </TweetForm>

      {posts.map((post) => (
        <PostCard key={post.id}>
          <AuthorName
            onClick={() => navigate(`/profile/${post.author_username}`)}
          >
            {post.author_username}
          </AuthorName>
          <PostContent>{post.content}</PostContent>

          <PostActions>
            <ActionButton type="button" activeColor="#1d9bf0">
              💬 {post.comments_count}
            </ActionButton>
            <ActionButton
              type="button"
              onClick={() => handleLike(post.id)}
              active={post.likes_count > 0}
              activeColor="#f91880"
            >
              ❤️ {post.likes_count}
            </ActionButton>
          </PostActions>
        </PostCard>
      ))}

      {posts.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#71767b" }}>
          Nenhum post para mostrar.
        </p>
      )}
    </FeedContainer>
  );
}
