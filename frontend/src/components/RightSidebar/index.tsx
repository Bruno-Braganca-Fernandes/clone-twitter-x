import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { FollowButton } from "../FollowButton";
import {
  Container,
  SearchInput,
  WidgetBox,
  WidgetTitle,
  PlaceholderText,
  NewsItem,
  NewsTitle,
  SuggestedUser,
  UserInfoWrapper,
  Avatar,
  UserDetails,
  UserName,
  UserHandle,
} from "./styles";

interface News {
  id: number;
  title: string;
  tags: string;
  url: string;
}

interface SuggestedUserType {
  username: string;
  profile_picture?: string;
  is_following: boolean;
}

export function RightSidebar() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [usersList, setUsersList] = useState<SuggestedUserType[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("https://dev.to/api/articles?per_page=3");
        const data = await response.json();
        setNewsList(data);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      } finally {
        setLoadingNews(false);
      }
    }

    async function fetchUsers() {
      try {
        const response = await api.get("/users/");
        const allUsers = response.data;

        const otherUsers = allUsers.filter(
          (u: SuggestedUserType) =>
            u.username !== user?.username && !u.is_following,
        );

        const shuffledUsers = otherUsers.sort(() => 0.5 - Math.random());
        setUsersList(shuffledUsers.slice(0, 3));
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoadingUsers(false);
      }
    }

    fetchNews();
    fetchUsers();
  }, [user]);

  return (
    <Container>
      <SearchInput placeholder="Buscar no CloneX" />

      <WidgetBox>
        <WidgetTitle>O que está acontecendo</WidgetTitle>
        {loadingNews ? (
          <PlaceholderText>Carregando notícias...</PlaceholderText>
        ) : (
          newsList.map((news) => (
            <NewsItem
              key={news.id}
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Tech & Dev • {news.tags.split(",")[0]}</span>
              <NewsTitle>{news.title}</NewsTitle>
            </NewsItem>
          ))
        )}
      </WidgetBox>

      <WidgetBox>
        <WidgetTitle>Quem seguir</WidgetTitle>

        {loadingUsers ? (
          <PlaceholderText>Procurando pessoas...</PlaceholderText>
        ) : usersList.length === 0 ? (
          <PlaceholderText>Nenhuma sugestão no momento.</PlaceholderText>
        ) : (
          usersList.map((suggestedUser) => (
            <SuggestedUser
              key={suggestedUser.username}
              onClick={() => navigate(`/profile/${suggestedUser.username}`)}
            >
              <UserInfoWrapper>
                <Avatar $bgImage={suggestedUser.profile_picture || undefined} />
                <UserDetails>
                  <UserName>{suggestedUser.username}</UserName>
                  <UserHandle>@{suggestedUser.username}</UserHandle>
                </UserDetails>
              </UserInfoWrapper>

              <FollowButton
                username={suggestedUser.username}
                initialIsFollowing={false}
              />
            </SuggestedUser>
          ))
        )}
      </WidgetBox>
    </Container>
  );
}
