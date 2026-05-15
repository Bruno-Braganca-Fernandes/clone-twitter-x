import { type ReactNode } from "react";
import { Container, MainContent } from "./styles";
import { Sidebar } from "../Sidebar";
import { RightSidebar } from "../RightSidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <Sidebar />
      <MainContent>{children}</MainContent>
      <RightSidebar />
    </Container>
  );
}
