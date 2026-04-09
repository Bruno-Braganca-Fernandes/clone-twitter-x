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
  CommentsSection,
  CommentForm,
  CommentList,
  CommentInput,
  CommentItem,
} from "./styles";

interface Post {
  id: number;
  author_username: string;
  content: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
}

interface CommentData {
  id: number;
  author_username: string;
  content: string;
}

export function Feed() {
  const { signOut } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  const [newPostContent, setNewPostContent] = useState("");

  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [postComments, setPostComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState("");

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

  async function toggleComments(postId: number) {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
      return;
    }

    setExpandedPostId(postId);
    try {
      const response = await api.get(`posts/${postId}/comments/`);
      setPostComments(response.data);
    } catch (error) {
      console.error("Erro ao carregar comentários", error);
    }
  }

  async function handleAddComment(event: React.SyntheticEvent, postId: number) {
    event.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await api.post("comments/", {
        post: postId,
        content: newComment,
      });

      setPostComments([...postComments, response.data]);
      setNewComment("");

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments_count: post.comments_count + 1 }
            : post,
        ),
      );
    } catch (error) {
      console.error("Erro ao enviar comentário", error);
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
          <button
            onClick={() => navigate("/settings")}
            style={{
              background: "transparent",
              color: "#eff3f4",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ⚙️ Perfil
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
            <ActionButton
              type="button"
              activeColor="#1d9bf0"
              onClick={() => toggleComments(post.id)}
              $active={expandedPostId === post.id}
            >
              💬 {post.comments_count}
            </ActionButton>
            <ActionButton
              type="button"
              onClick={() => handleLike(post.id)}
              $active={post.likes_count > 0}
              activeColor="#f91880"
            >
              ❤️ {post.likes_count}
            </ActionButton>
          </PostActions>
          {expandedPostId === post.id && (
            <CommentsSection>
              <CommentForm onSubmit={(e) => handleAddComment(e, post.id)}>
                <CommentInput
                  placeholder="Postar sua resposta"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <TweetButton
                  type="submit"
                  disabled={!newComment.trim()}
                  style={{ padding: "6px 12px", fontSize: "13px" }}
                >
                  Responder
                </TweetButton>
              </CommentForm>

              <CommentList>
                {postComments.map((comment) => (
                  <CommentItem key={comment.id}>
                    <strong>{comment.author_username}</strong>
                    <span>{comment.content}</span>
                  </CommentItem>
                ))}
                {postComments.length === 0 && (
                  <p
                    style={{
                      color: "#71767b",
                      fontSize: "13px",
                      textAlign: "center",
                    }}
                  >
                    Sem respostas ainda. Seja o primeiro!
                  </p>
                )}
              </CommentList>
            </CommentsSection>
          )}
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
