import {
  Container,
  SearchInput,
  WidgetBox,
  WidgetTitle,
  PlaceholderText,
} from "./styles";

export function RightSidebar() {
  return (
    <Container>
      <SearchInput placeholder="Buscar no CloneX" />

      <WidgetBox>
        <WidgetTitle>O que está acontecendo</WidgetTitle>
        <PlaceholderText>Notícias quentes em breve...</PlaceholderText>
      </WidgetBox>

      <WidgetBox>
        <WidgetTitle>Quem seguir</WidgetTitle>
        <PlaceholderText>Novos usuários aparecerão aqui...</PlaceholderText>
      </WidgetBox>
    </Container>
  );
}
