import { type ReactNode } from "react";
import { Container, MainContent } from "./styles";
import { Sidebar } from "../Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <Sidebar />
      <MainContent>{children}</MainContent>
      <div
        style={{ width: "275px" }}
        className="right-sidebar-placeholder"
      ></div>
    </Container>
  );
}
