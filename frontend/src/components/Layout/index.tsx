import { type ReactNode } from "react";
import { Container, MainContent } from "./styles";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <MainContent>{children}</MainContent>
    </Container>
  );
}
