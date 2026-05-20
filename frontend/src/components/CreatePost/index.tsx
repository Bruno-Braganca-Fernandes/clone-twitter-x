import { useState } from "react";
import { FormContainer, Input, ButtonContainer, SubmitButton } from "./styles";

interface CreatePostProps {
  onCreatePost: (content: string) => void;
}

export function CreatePost({ onCreatePost }: CreatePostProps) {
  const [content, setContent] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    onCreatePost(content);
    setContent("");
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        placeholder="O que está acontecendo?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={280}
      />
      <ButtonContainer>
        <SubmitButton type="submit" disabled={!content.trim()}>
          Postar
        </SubmitButton>
      </ButtonContainer>
    </FormContainer>
  );
}
