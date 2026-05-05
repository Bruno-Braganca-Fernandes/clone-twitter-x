import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Header } from "../../components/Header";
import {
  FeedContainer,
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
  created_at: string;
}

function formatData(dataString: string) {
  if (!dataString) return "";
  const data = new Date(dataString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(data);
}

export function Feed() {
  const { user } = useContext(AuthContext);
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

  async function handleDeletePost(postId: number) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este post?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`posts/${postId}/`);

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

      alert("Post excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir post:", error);
      alert("Erro ao excluir o post.");
    }
  }

  async function handleDeleteComment(commentId: number) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este comentário?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`comments/${commentId}/`);

      setPostComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId),
      );
    } catch (error) {
      console.error("Erro ao excluir comentário:", error);
      alert("Erro ao excluir o comentário.");
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

      setPostComments([response.data, ...postComments]);
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
      <Header />

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <AuthorName
              onClick={() => navigate(`/profile/${post.author_username}`)}
            >
              {post.author_username}
            </AuthorName>

            {user && user.username === post.author_username && (
              <button
                onClick={() => handleDeletePost(post.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#f91880",
                  cursor: "pointer",
                }}
                title="Excluir Post"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
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
                  <CommentItem
                    key={comment.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        marginBottom: "4px",
                        alignItems: "center",
                      }}
                    >
                      <AuthorName
                        onClick={() =>
                          navigate(`/profile/${comment.author_username}`)
                        }
                        style={{ fontSize: "14px" }}
                      >
                        {comment.author_username}
                      </AuthorName>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span style={{ fontSize: "12px", color: "#71767b" }}>
                          {formatData(comment.created_at)}
                        </span>

                        {user && user.username === comment.author_username && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#f91880",
                              cursor: "pointer",
                              padding: 0,
                              display: "flex",
                            }}
                            title="Excluir Comentário"
                          >
                            <Trash2 size={14} />{" "}
                          </button>
                        )}
                      </div>
                    </div>

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
