import styled from 'styled-components';
import { FeedContainer, Header, TweetButton } from '../Feed/styles';

export { FeedContainer, Header };

export const BackButton = styled.button`
  background: transparent;
  color: #eff3f4;
  font-size: 1.2rem;
  margin-right: 16px;
  cursor: pointer;
  border: none;
`;

export const ProfileDetails = styled.div`
  padding: 20px;
  border-bottom: 1px solid #2f3336;
  color: #e7e9ea;
`;

export const ProfileHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #333639;
  border: 4px solid black;
`;

export const FollowButton = styled(TweetButton) <{ $isFollowing?: boolean }>`
  background-color: ${props => props.$isFollowing ? 'transparent' : 'white'};
  color: ${props => props.$isFollowing ? '#eff3f4' : 'black'};
  border: ${props => props.$isFollowing ? '1px solid #536471' : 'none'};
  margin-top: 10px;
`;

export const ProfileName = styled.h2`
  margin-top: 10px;
  font-size: 20px;
`;

export const ProfileUsername = styled.p`
  color: #71767b;
  font-size: 15px;
`;

export const BioText = styled.p`
  margin-top: 12px;
  font-size: 15px;
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 16px;
  color: #71767b;
  font-size: 14px;

  strong {
    color: #e7e9ea;
  }
`;