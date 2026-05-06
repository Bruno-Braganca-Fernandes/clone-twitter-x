import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, MessageCircle, Heart } from "lucide-react";
import {
  PostContainer,
  PostHeader,
  AuthorName,
  DeleteButton,
  PostContent,
  PostActions,
  ActionButton,
  CommentsSection,
  CommentForm,
  CommentInput,
  CommentItemContainer,
  CommentHeader,
  CommentInfo,
  CommentText,
  ReplyButton,
  CommentAuthorName,
  CommentDeleteButton,
  EmptyCommentsText,
} from "./styles";

export interface PostData {
  id: number;
  author_username: string;
  content: string;
  likes_count: number;
  comments_count: number;
}

export interface CommentData {
  id: number;
  author_username: string;
  content: string;
  created_at: string;
}

export interface UserData {
  username: string;
}

interface PostProps {
  post: PostData;
  currentUser: UserData | null;
  isExpanded: boolean;
  comments: CommentData[];
  onDeletePost: (id: number) => void;
  onLike: (id: number) => void;
  onToggleComments: (id: number) => void;
  onAddComment: (postId: number, content: string) => void;
  onDeleteComment: (commentId: number, postId: number) => void;
}

export function Post({
  post,
  currentUser,
  isExpanded,
  comments,
  onDeletePost,
  onLike,
  onToggleComments,
  onAddComment,
  onDeleteComment,
}: PostProps) {
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");

  function formatData(dataString: string) {
    if (!dataString) return "";
    const data = new Date(dataString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(data);
  }

  function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText);
    setCommentText("");
  }

  return (
    <PostContainer>
      <PostHeader>
        <AuthorName
          onClick={() => navigate(`/profile/${post.author_username}`)}
        >
          {post.author_username}
        </AuthorName>

        {currentUser?.username === post.author_username && (
          <DeleteButton
            onClick={() => onDeletePost(post.id)}
            title="Excluir Post"
          >
            <Trash2 size={18} />
          </DeleteButton>
        )}
      </PostHeader>

      <PostContent>{post.content}</PostContent>

      <PostActions>
        <ActionButton
          onClick={() => onToggleComments(post.id)}
          $active={isExpanded}
          activeColor="#1d9bf0"
        >
          <MessageCircle size={18} /> {post.comments_count}
        </ActionButton>

        <ActionButton
          onClick={() => onLike(post.id)}
          $active={post.likes_count > 0}
          activeColor="#f91880"
        >
          <Heart size={18} fill={post.likes_count > 0 ? "#f91880" : "none"} />{" "}
          {post.likes_count}
        </ActionButton>
      </PostActions>

      {isExpanded && (
        <CommentsSection>
          <CommentForm onSubmit={handleCommentSubmit}>
            <CommentInput
              placeholder="Postar sua resposta"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <ReplyButton type="submit" disabled={!commentText.trim()}>
              Responder
            </ReplyButton>
          </CommentForm>

          {comments.map((comment) => (
            <CommentItemContainer key={comment.id}>
              <CommentHeader>
                <CommentAuthorName
                  onClick={() =>
                    navigate(`/profile/${comment.author_username}`)
                  }
                >
                  {comment.author_username}
                </CommentAuthorName>

                <CommentInfo>
                  <span>{formatData(comment.created_at)}</span>
                  {currentUser?.username === comment.author_username && (
                    <CommentDeleteButton
                      onClick={() => onDeleteComment(comment.id, post.id)}
                      title="Excluir Comentário"
                    >
                      <Trash2 size={14} />
                    </CommentDeleteButton>
                  )}
                </CommentInfo>
              </CommentHeader>
              <CommentText>{comment.content}</CommentText>
            </CommentItemContainer>
          ))}

          {comments.length === 0 && (
            <EmptyCommentsText>
              Sem respostas ainda. Seja o primeiro!
            </EmptyCommentsText>
          )}
        </CommentsSection>
      )}
    </PostContainer>
  );
}
