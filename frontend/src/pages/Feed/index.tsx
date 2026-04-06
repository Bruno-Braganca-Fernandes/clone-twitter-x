import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
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

  return (
    <FeedContainer>
      <Header>
        <h1>Página Inicial</h1>
        <LogoutButton onClick={signOut}>Sair</LogoutButton>
      </Header>

      <TweetForm onSubmit={handleCreatePost}>
        <TweetInput
          placeholder="O que está acontecendo?"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          maxLength={280} // Limite clássico do X
        />
        <TweetButtonContainer>
          <TweetButton type="submit" disabled={!newPostContent.trim()}>
            Postar
          </TweetButton>
        </TweetButtonContainer>
      </TweetForm>

      {posts.map((post) => (
        <PostCard key={post.id}>
          <AuthorName>{post.author_username}</AuthorName>
          <PostContent>{post.content}</PostContent>

          <PostActions>
            <span>💬 {post.comments_count}</span>
            <span>❤️ {post.likes_count}</span>
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
