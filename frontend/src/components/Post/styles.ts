import styled from "styled-components";

export const PostContainer = styled.article`
  padding: 16px;
  border-bottom: 1px solid #2f3336;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const AuthorName = styled.span`
  font-weight: bold;
  font-size: 15px;
  color: #eff3f4;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #71767b;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(249, 24, 128, 0.1);
    color: #f91880;
  }
`;

export const PostContent = styled.p`
  font-size: 15px;
  color: #eff3f4;
  margin: 0 0 12px 0;
  line-height: 1.5;
  word-wrap: break-word;
`;

export const PostActions = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 12px;
`;

export const ActionButton = styled.button<{ $active?: boolean; activeColor?: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: ${(props) => (props.$active ? props.activeColor : "#71767b")};
  font-size: 13px;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.activeColor || "#1d9bf0"};
  }
`;

export const CommentsSection = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #2f3336;
`;

export const CommentForm = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

export const CommentInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid #2f3336;
  border-radius: 4px;
  color: #eff3f4;
  padding: 8px 12px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

export const CommentItemContainer = styled.div`
margin-bottom: 12px;
  padding: 12px 16px;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  
  transition: background-color 0.2s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

export const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #71767b;
`;

export const CommentText = styled.p`
  color: #eff3f4;
  font-size: 14px;
  margin: 0;
  line-height: 1.4;
`;

export const ReplyButton = styled.button`
  background-color: #1d9bf0;
  color: white;
  border: none;
  border-radius: 9999px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 6px 12px;
  font-size: 13px;

  &:disabled {
    background-color: rgba(29, 155, 240, 0.5);
    cursor: default;
  }

  &:hover:not(:disabled) {
    background-color: #1a8cd8;
  }
`;

export const CommentAuthorName = styled(AuthorName)`
  font-size: 14px;
`;

export const CommentDeleteButton = styled(DeleteButton)`
  padding: 4px;
`;

export const EmptyCommentsText = styled.p`
  color: #71767b;
  font-size: 13px;
  text-align: center;
  margin-top: 16px;
`;