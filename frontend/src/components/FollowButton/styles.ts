import styled from "styled-components";

export const ButtonContainer = styled.button<{ $isFollowing: boolean }>`
  background-color: ${(props) => (props.$isFollowing ? "#0f1419" : "#eff3f4")};
  color: ${(props) => (props.$isFollowing ? "#eff3f4" : "#0f1419")};
  border: ${(props) => (props.$isFollowing ? "1px solid #536471" : "none")};
  border-radius: 9999px;
  padding: 6px 16px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 105px;
  display: flex;
  align-items: center;
  justify-content: center;

  .text-unfollow {
    display: none;
  }

  &:hover {
    background-color: ${(props) =>
        props.$isFollowing ? "rgba(244, 33, 46, 0.1)" : "#1d9bf0"};
    color: ${(props) => (props.$isFollowing ? "#f4212e" : "#fff")};
    border-color: ${(props) => (props.$isFollowing ? "#f4212e" : "transparent")};
  }

  &:hover .text-following {
    display: ${(props) => (props.$isFollowing ? "none" : "block")};
  }
  
  &:hover .text-unfollow {
    display: ${(props) => (props.$isFollowing ? "block" : "none")};
  }
`;