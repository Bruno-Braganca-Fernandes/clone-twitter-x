import { useContext, useEffect, useState } from "react";
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

  return (
    <FeedContainer>
      <Header>
        <h1>Página Inicial</h1>
        <LogoutButton onClick={signOut}>Sair</LogoutButton>
      </Header>

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
          Nenhum post para mostrar. Siga alguém!
        </p>
      )}
    </FeedContainer>
  );
}
