import styled from 'styled-components';
import { FeedContainer, Header } from '../Feed/styles';

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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(91, 112, 131, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #000;
  width: 100%;
  max-width: 400px;
  height: 400px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #2f3336;
  
  h2 {
    color: #e7e9ea;
    font-size: 20px;
    margin-left: 16px;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #eff3f4;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const UserList = styled.div`
  overflow-y: auto;
  flex: 1;
`;

export const UserListItem = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #2f3336;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

export const SmallAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #333639;
  border: 1px solid #2f3336;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid black;
  background-color: #2f3336;
`;

export const SectionTitle = styled.h3`
  padding: 16px;
  color: #e7e9ea;
  border-bottom: 1px solid #2f3336;
  margin: 0;
  font-size: 20px;
`;

export const EmptyStateText = styled.p`
  text-align: center;
  margin-top: 30px;
  color: #71767b;
  font-size: 15px;
`;

export const LoadingText = styled.p`
  color: #71767b;
  text-align: center;
  margin-top: 50px;
  font-size: 16px;
`;

export const StatNumber = styled.strong`
  color: #eff3f4;
`;

export const ModalUserName = styled.strong`
  color: #e7e9ea;
  display: block;
`;

export const ModalUserHandle = styled.span`
  color: #71767b;
  font-size: 14px;
`;

export const ModalEmptyText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #71767b;
`;

export const EditProfileButton = styled.button`
  background-color: transparent;
  color: #eff3f4;
  border: 1px solid #536471;
  border-radius: 9999px;
  padding: 6px 16px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(239, 243, 244, 0.1);
  }
`;