import { useEffect, useState } from "react";
import {
  Container,
  SearchInput,
  WidgetBox,
  WidgetTitle,
  PlaceholderText,
  NewsItem,
  NewsTitle,
} from "./styles";

interface News {
  id: number;
  title: string;
  tags: string;
  url: string;
}

export function RightSidebar() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("https://dev.to/api/articles?per_page=3");
        const data = await response.json();

        setNewsList(data);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <Container>
      <SearchInput placeholder="Buscar no CloneX" />

      <WidgetBox>
        <WidgetTitle>O que está acontecendo</WidgetTitle>

        {loading ? (
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
        <PlaceholderText>Novos usuários aparecerão aqui...</PlaceholderText>
      </WidgetBox>
    </Container>
  );
}
