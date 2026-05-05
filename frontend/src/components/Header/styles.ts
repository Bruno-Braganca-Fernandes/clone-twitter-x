import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #000;
  border-bottom: 1px solid #2f3336;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 600px) {
    padding: 12px 16px;
  }
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin: 0;
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;

  a {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #fff;
    text-decoration: none;
    font-size: 15px;
    font-weight: 600;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #1d9bf0;
    }
  }

  @media (max-width: 600px) {
    gap: 16px;
    span {
      display: none;
    }
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 600;
  background: none;
  cursor: pointer;
  transition: all 0.2s;

  color: #fff;
  border: 1px solid #536471;
  padding: 6px 16px;
  border-radius: 9999px;
  
  &:hover {
    background-color: rgba(249, 24, 128, 0.1);
    color: #f91880; 
    border-color: #f91880;
  }
`;