import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { ProfileHeader } from "../../components/ProfileHeader";
import { Post } from "../../components/Post";
import { Layout } from "../../components/Layout";
import { FollowButton } from "../../components/FollowButton";
import {
  ProfileDetails,
  ProfileHeaderRow,
  Avatar,
  ProfileName,
  ProfileUsername,
  BioText,
  StatsContainer,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  CloseButton,
  UserList,
  UserListItem,
  SmallAvatar,
  LoadingText,
  ProfileImage,
  StatNumber,
  SectionTitle,
  EmptyStateText,
  ModalUserName,
  ModalEmptyText,
  ModalUserHandle,
  EditProfileButton,
} from "./styles";

interface UserProfile {
  id: number;
  username: string;
  followers_count: number;
  following_count: number;
  bio: string | null;
  is_following: boolean;
  profile_picture: string | null;
}

interface SimpleUser {
  id: number;
  username: string;
  profile_picture: string | null;
}

interface Post {
  id: number;
  author_username: string;
  content: string;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
}

interface CommentData {
  id: number;
  author_username: string;
  content: string;
  created_at: string;
}

export function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"followers" | "following">(
    "followers",
  );
  const [modalUsers, setModalUsers] = useState<SimpleUser[]>([]);

  const { user } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [postComments, setPostComments] = useState<CommentData[]>([]);

  async function handleLike(postId: number) {
    try {
      const response = await api.post(`posts/${postId}/like/`);
      setUserPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes_count: response.data.likes_count,
                is_liked: response.data.is_liked,
              }
            : post,
        ),
      );
    } catch (error) {
      console.error("Erro ao curtir post no perfil:", error);
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
      setUserPosts((prevPosts) =>
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
      setUserPosts((prevPosts) =>
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

  async function handleDeletePost(postId: number) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este post?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`posts/${postId}/`);
      setUserPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postId),
      );
    } catch (error) {
      console.error("Erro ao excluir post:", error);
      alert("Erro ao excluir o post.");
    }
  }

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await api.get(`users/${username}/`);
        setProfile(response.data);
        const postsResponse = await api.get(`users/${username}/posts/`);
        setUserPosts(postsResponse.data);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        alert("Usuário não encontrado!");
        navigate("/feed");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [username, navigate]);

  useEffect(() => {
    function handleSyncFollow(e: CustomEvent) {
      const { username: changedUser, isFollowing: newStatus } = e.detail;

      if (profile?.username === changedUser) {
        setProfile((prev) => {
          if (!prev) return prev;
          if (prev.is_following === newStatus) return prev;

          return {
            ...prev,
            is_following: newStatus,
            followers_count: newStatus
              ? prev.followers_count + 1
              : prev.followers_count - 1,
          };
        });
      }
    }

    window.addEventListener("followChange", handleSyncFollow as EventListener);
    return () => {
      window.removeEventListener(
        "followChange",
        handleSyncFollow as EventListener,
      );
    };
  }, [profile?.username]);

  async function openModal(type: "followers" | "following") {
    setModalType(type);
    setIsModalOpen(true);
    try {
      const response = await api.get(`users/${username}/${type}/`);
      setModalUsers(response.data);
    } catch (error) {
      console.error(`Erro ao carregar ${type}:`, error);
    }
  }

  if (loading) {
    return <LoadingText>Carregando perfil...</LoadingText>;
  }

  return (
    <Layout>
      <ProfileHeader
        username={profile?.username || "Carregando..."}
        followersCount={profile?.followers_count || 0}
      />

      <ProfileDetails>
        <ProfileHeaderRow>
          {profile?.profile_picture ? (
            <ProfileImage src={profile.profile_picture} alt="Foto de perfil" />
          ) : (
            <Avatar />
          )}

          {user?.username === profile?.username ? (
            <EditProfileButton onClick={() => navigate("/settings")}>
              Editar perfil
            </EditProfileButton>
          ) : (
            <FollowButton
              key={profile?.username}
              username={profile?.username || ""}
              initialIsFollowing={profile?.is_following}
            />
          )}
        </ProfileHeaderRow>
        <ProfileName>{profile?.username}</ProfileName>
        <ProfileUsername>@{profile?.username}</ProfileUsername>
        {profile?.bio && <BioText>{profile.bio}</BioText>}

        <StatsContainer>
          <span onClick={() => openModal("following")}>
            <StatNumber>{profile?.following_count}</StatNumber> Seguindo
          </span>
          <span onClick={() => openModal("followers")}>
            <StatNumber>{profile?.followers_count}</StatNumber> Seguidores
          </span>
        </StatsContainer>
      </ProfileDetails>
      <div>
        <SectionTitle>Postagens</SectionTitle>

        {userPosts.map((post) => (
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

        {userPosts.length === 0 && !loading && (
          <EmptyStateText>
            Este usuário ainda não tem nenhuma postagem.
          </EmptyStateText>
        )}
      </div>
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          {" "}
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {" "}
            <ModalHeader>
              <CloseButton onClick={() => setIsModalOpen(false)}>✕</CloseButton>
              <h2>{modalType === "followers" ? "Seguidores" : "Seguindo"}</h2>
            </ModalHeader>
            <UserList>
              {modalUsers.map((user) => (
                <UserListItem
                  key={user.id}
                  onClick={() => {
                    setIsModalOpen(false);
                    navigate(`/profile/${user.username}`);
                  }}
                >
                  <SmallAvatar>
                    {user.profile_picture && (
                      <img src={user.profile_picture} alt={user.username} />
                    )}
                  </SmallAvatar>
                  <div>
                    <ModalUserName>{user.username}</ModalUserName>
                    <ModalUserHandle>@{user.username}</ModalUserHandle>
                  </div>
                </UserListItem>
              ))}
              {modalUsers.length === 0 && (
                <ModalEmptyText>Lista vazia.</ModalEmptyText>
              )}
            </UserList>
          </ModalContent>
        </ModalOverlay>
      )}
    </Layout>
  );
}
