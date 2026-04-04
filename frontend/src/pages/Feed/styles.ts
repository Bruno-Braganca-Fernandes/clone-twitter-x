import styled from 'styled-components';

export const FeedContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  border-left: 1px solid #2f3336;
  border-right: 1px solid #2f3336;
  min-height: 100vh;
`;

export const Header = styled.header`
  padding: 16px;
  border-bottom: 1px solid #2f3336;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;

  h1 {
    font-size: 1.2rem;
    color: #e7e9ea;
  }
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  color: #eff3f4;
  border: 1px solid #536471;
  padding: 6px 16px;
  border-radius: 9999px;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    background-color: rgba(239, 243, 244, 0.1);
  }
`;

export const PostCard = styled.article`
  padding: 16px;
  border-bottom: 1px solid #2f3336;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

export const AuthorName = styled.span`
  font-weight: bold;
  font-size: 1rem;
  color: #e7e9ea;
`;

export const PostContent = styled.p`
  font-size: 15px;
  line-height: 20px;
  color: #e7e9ea;
  white-space: pre-wrap;
`;

export const PostActions = styled.div`
  display: flex;
  gap: 24px;
  color: #71767b;
  font-size: 13px;
  margin-top: 8px;
`;