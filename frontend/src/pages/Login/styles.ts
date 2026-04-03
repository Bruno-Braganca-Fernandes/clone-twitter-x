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
  border-radius: 16px;
  border: 1px solid #2f3336;
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  color: #e7e9ea;
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
`;

export const Input = styled.input`
  background-color: transparent;
  border: 1px solid #333639;
  border-radius: 4px;
  color: #e7e9ea;
  padding: 16px;
  font-size: 1rem;
  margin-bottom: 20px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #1d9bf0;
  }
`;

export const Button = styled.button`
  background-color: #e7e9ea;
  color: #0f1419;
  font-size: 1rem;
  font-weight: bold;
  padding: 16px;
  border-radius: 30px;
  margin-top: 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d7dbdc;
  }
`;