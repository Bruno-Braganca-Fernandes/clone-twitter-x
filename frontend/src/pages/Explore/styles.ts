import styled from 'styled-components';
import { FeedContainer, Header } from '../Feed/styles';

export { FeedContainer, Header };

export const UserCard = styled.div`
  padding: 16px;
  border-bottom: 1px solid #2f3336;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

export const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #333639;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-weight: bold;
  color: #e7e9ea;
  font-size: 15px;
`;

export const UserHandle = styled.span`
  color: #71767b;
  font-size: 15px;
`;