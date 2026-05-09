import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

export const MainContent = styled.main`
  flex: 1;
  max-width: 600px;
  width: 100%;
  border-left: 1px solid #2f3336;
  border-right: 1px solid #2f3336;
  min-height: 100vh;
  
  @media (max-width: 600px) {
    border: none;
  }
`;