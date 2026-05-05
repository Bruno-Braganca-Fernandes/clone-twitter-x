import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #2f3336;
  position: sticky;
  top: 0;
  z-index: 100;
  gap: 24px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #eff3f4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(239, 243, 244, 0.1);
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 20px;
    font-weight: bold;
    color: #eff3f4;
    margin: 0;
    line-height: 1.2;
  }

  span {
    font-size: 13px;
    color: #71767b;
  }
`;