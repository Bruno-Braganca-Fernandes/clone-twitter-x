import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-bottom: 1px solid #2f3336;
`;

export const Input = styled.textarea`
  width: 100%;
  background-color: transparent;
  border: none;
  color: #eff3f4;
  font-size: 20px;
  resize: none;
  min-height: 80px;
  margin-bottom: 12px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #71767b;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #2f3336;
  padding-top: 12px;
`;

export const SubmitButton = styled.button`
  background-color: #1d9bf0;
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 8px 16px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    background-color: rgba(29, 155, 240, 0.5);
    cursor: default;
  }

  &:hover:not(:disabled) {
    background-color: #1a8cd8;
  }
`;