import styled from "styled-components";

export const SidebarContainer = styled.aside`
  width: 275px;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  
  @media (max-width: 600px) {
    display: none;
  }
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  margin-bottom: 8px;
  font-size: 20px;
  color: #e7e9ea;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: fit-content; 
  padding-right: 24px;

  &:hover {
    background-color: rgba(231, 233, 234, 0.1);
  }

  span {
    font-weight: 400;
  }
`;

export const LogoContainer = styled.div`
  padding: 12px;
  margin-bottom: 10px;
  width: fit-content;
  color: #e7e9ea;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(231, 233, 234, 0.1);
  }
`;

export const LogoutNavItem = styled(NavItem)`
  color: #f4212e;

  &:hover {
    background-color: rgba(244, 33, 46, 0.1);
  }
`;

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  margin-top: auto; 
  margin-bottom: 20px;

  &:hover {
    background-color: rgba(231, 233, 234, 0.1);
  }
`;

export const UserAvatar = styled.div<{ $bgImage?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #5c6e7e;
  background-image: url(${props => props.$bgImage || ""});
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const UserName = styled.span`
  font-weight: bold;
  color: #e7e9ea;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserHandle = styled.span`
  color: #71767b;
  font-size: 15px;
`;