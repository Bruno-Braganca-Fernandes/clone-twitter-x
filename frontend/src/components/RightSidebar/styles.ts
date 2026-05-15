import styled from "styled-components";

export const Container = styled.aside`
  width: 350px;
  padding: 12px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px; 
  height: 100vh;
  position: sticky;
  top: 0;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const SearchInput = styled.input`
  background-color: #202327;
  border: none;
  border-radius: 9999px;
  padding: 14px 20px;
  color: #e7e9ea;
  font-size: 15px;
  outline: none;
  width: 100%;
  transition: all 0.2s;
  
  &:focus {
    background-color: black;
    border: 1px solid #1d9bf0;
  }

  &::placeholder {
    color: #71767b;
  }
`;

export const WidgetBox = styled.div`
  background-color: #16181c;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const WidgetTitle = styled.h2`
  color: #e7e9ea;
  font-size: 20px;
  font-weight: 800;
`;

export const PlaceholderText = styled.p`
  color: #71767b;
  font-size: 14px;
  text-align: center;
  padding: 10px 0;
`;

export const NewsItem = styled.a`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }

  span {
    color: #71767b;
    font-size: 13px;
    margin-bottom: 4px;
  }
`;

export const NewsTitle = styled.h3`
  color: #e7e9ea;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.3;
  margin: 0;
`;