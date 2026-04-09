import styled from 'styled-components';
import { FeedContainer, Header, TweetButton } from '../Feed/styles';

export { FeedContainer, Header };

export const SettingsForm = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-bottom: 1px solid #2f3336;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  color: #e7e9ea;
  font-weight: bold;
  font-size: 15px;
`;

export const Input = styled.input`
  background-color: transparent;
  border: 1px solid #333639;
  color: #e7e9ea;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: #1d9bf0;
    outline: none;
  }
`;

export const FileInput = styled.input`
  color: #71767b;
  font-size: 14px;
  
  &::file-selector-button {
    background-color: #eff3f4;
    color: #0f1419;
    font-weight: bold;
    border: none;
    padding: 8px 16px;
    border-radius: 9999px;
    cursor: pointer;
    margin-right: 12px;
    transition: 0.2s;
  }

  &::file-selector-button:hover {
    background-color: #d7dbdc;
  }
`;

export const SaveButton = styled(TweetButton)`
  align-self: flex-start;
  margin-top: 10px;
`;