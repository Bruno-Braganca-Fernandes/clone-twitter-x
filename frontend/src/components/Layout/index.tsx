import { Outlet } from "react-router-dom";
import { Container, MainContent } from "./styles";
import { Sidebar } from "../Sidebar";
import { RightSidebar } from "../RightSidebar";

export function Layout() {
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
      <RightSidebar />
    </Container>
  );
}
