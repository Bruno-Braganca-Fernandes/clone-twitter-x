import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { api } from "../../services/api";
import {
  FeedContainer,
  Header,
  BackButton,
  ProfileDetails,
  ProfileHeaderRow,
  Avatar,
  FollowButton,
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
} from "./styles";

import {
  PostCard,
  AuthorName,
  PostContent,
  PostActions,
  ActionButton,
  CommentsSection,
  CommentForm,
  CommentInput,
  TweetButton,
  CommentList,
  CommentItem,
} from "../Feed/styles";

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

  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [postComments, setPostComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState("");

  async function handleLike(postId: number) {
    try {
      const response = await api.post(`posts/${postId}/like/`);
      setUserPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, likes_count: response.data.likes_count }
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

  async function handleFollowToggle() {
    if (!profile) return;

    try {
      const action = profile.is_following ? "unfollow" : "follow";
      await api.post(`users/${profile.username}/${action}/`);

      setProfile((prevProfile) => {
        if (!prevProfile) return null;
        const followersChange = prevProfile.is_following ? -1 : 1;
        return {
          ...prevProfile,
          is_following: !prevProfile.is_following,
          followers_count: prevProfile.followers_count + followersChange,
        };
      });
    } catch (error) {
      console.error("Erro ao alterar follow status:", error);

      if (isAxiosError(error) && error.response?.data?.detail) {
        alert(error.response.data.detail);
      } else {
        alert("Erro ao processar ação de seguir.");
      }
    }
  }

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
    return (
      <p style={{ color: "#71767b", textAlign: "center", marginTop: "50px" }}>
        Carregando perfil...
      </p>
    );
  }

  return (
    <FeedContainer>
      <Header>
        <BackButton onClick={() => navigate("/feed")}>←</BackButton>
        <div>
          <h1>{profile?.username}</h1>
          <span style={{ color: "#71767b", fontSize: "13px" }}>
            {profile?.followers_count} Seguidores
          </span>
        </div>
      </Header>

      <ProfileDetails>
        <ProfileHeaderRow>
          {profile?.profile_picture ? (
            <img
              src={profile.profile_picture}
              alt="Foto de perfil"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid black",
              }}
            />
          ) : (
            <Avatar />
          )}
          <FollowButton
            onClick={handleFollowToggle}
            $isFollowing={profile?.is_following}
          >
            {profile?.is_following ? "Seguindo" : "Seguir"}
          </FollowButton>
        </ProfileHeaderRow>

        <ProfileName>{profile?.username}</ProfileName>
        <ProfileUsername>@{profile?.username}</ProfileUsername>
        {profile?.bio && <BioText>{profile.bio}</BioText>}

        <StatsContainer>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => openModal("following")}
          >
            <strong>{profile?.following_count}</strong> Seguindo
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => openModal("followers")}
          >
            <strong>{profile?.followers_count}</strong> Seguidores
          </span>
        </StatsContainer>
      </ProfileDetails>
      <div>
        <h3
          style={{
            padding: "16px",
            color: "#e7e9ea",
            borderBottom: "1px solid #2f3336",
          }}
        >
          Postagens
        </h3>

        {userPosts.map((post) => (
          <PostCard key={post.id}>
            <AuthorName style={{ cursor: "default" }}>
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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          marginBottom: "4px",
                        }}
                      >
                        <AuthorName
                          onClick={() =>
                            navigate(`/profile/${comment.author_username}`)
                          }
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          {comment.author_username}
                        </AuthorName>
                        <span style={{ fontSize: "12px", color: "#71767b" }}>
                          {formatData(comment.created_at)}
                        </span>
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

        {userPosts.length === 0 && !loading && (
          <p
            style={{ textAlign: "center", marginTop: "30px", color: "#71767b" }}
          >
            Este usuário ainda não tem nenhuma postagem.
          </p>
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
                    <strong style={{ color: "#e7e9ea", display: "block" }}>
                      {user.username}
                    </strong>
                    <span style={{ color: "#71767b", fontSize: "14px" }}>
                      @{user.username}
                    </span>
                  </div>
                </UserListItem>
              ))}
              {modalUsers.length === 0 && (
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    color: "#71767b",
                  }}
                >
                  Lista vazia.
                </p>
              )}
            </UserList>
          </ModalContent>
        </ModalOverlay>
      )}
    </FeedContainer>
  );
}
