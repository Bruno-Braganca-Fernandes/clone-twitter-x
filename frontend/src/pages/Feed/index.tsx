import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { Header } from "../../components/Header";
import { CreatePost } from "../../components/CreatePost";
import { FeedContainer } from "./styles";
import { Post } from "../../components/Post";
import { ModalEmptyText } from "../Profile/styles";

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

export function Feed() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);

  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [postComments, setPostComments] = useState<CommentData[]>([]);

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

  async function handleCreatePost(content: string) {
    try {
      const response = await api.post("posts/", { content });
      setPosts((prevPosts) => [response.data, ...prevPosts]);
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

  async function handleDeleteComment(commentId: number, postId: number) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este comentário?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`comments/${commentId}/`);

      setPostComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId),
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments_count: Math.max(0, post.comments_count - 1) }
            : post,
        ),
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

  async function handleAddComment(postId: number, content: string) {
    if (!content.trim()) return;

    try {
      const response = await api.post("comments/", {
        post: postId,
        content: content,
      });

      setPostComments([response.data, ...postComments]);

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

      <CreatePost onCreatePost={handleCreatePost} />

      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          currentUser={user}
          isExpanded={expandedPostId === post.id}
          comments={postComments}
          onDeletePost={handleDeletePost}
          onLike={handleLike}
          onToggleComments={toggleComments}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
        />
      ))}

      {posts.length === 0 && (
        <ModalEmptyText>Nenhum post para mostrar.</ModalEmptyText>
      )}
    </FeedContainer>
  );
}
