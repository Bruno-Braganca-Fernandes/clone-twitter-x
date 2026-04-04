import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000000;
`;

export const LoginBox = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #000000;
  padding: 40px;
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  
  @media (min-width: 601px) {
    min-height: auto;
    max-width: 400px;
    border-radius: 16px;
    border: 1px solid #2f3336;
  }
`;

export const XLogo = styled.div`
  color: #eff3f4;
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  margin-top: -10px;
`;

export const Title = styled.h1`
  color: #eff3f4;
  font-size: 31px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: left;
`;

export const Input = styled.input`
  background-color: transparent;
  border: 1px solid #333639;
  border-radius: 4px;
  color: #eff3f4;
  padding: 16px;
  font-size: 1rem;
  margin-bottom: 20px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #1d9bf0;
    box-shadow: 0 0 0 1px #1d9bf0;
  }
`;

export const PrimaryButton = styled.button`
  background-color: #eff3f4;
  color: #0f1419;
  font-size: 15px;
  font-weight: bold;
  padding: 16px;
  border-radius: 9999px;
  margin-top: 10px;
  margin-bottom: 20px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d7dbdc;
  }
`;

export const OutlineButton = styled.button`
  background-color: transparent;
  color: #eff3f4;
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  border: 1px solid #eff3f4;
  border-radius: 9999px;
  margin-bottom: 40px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(239, 243, 244, 0.1);
  }
`;

export const LinksContainer = styled.div`
  margin-top: auto;
  color: #71767b;
  font-size: 15px;
  text-align: left;
`;

export const NavLink = styled.span`
  color: #1d9bf0;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;