import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { ButtonContainer } from "./styles";

interface FollowButtonProps {
  username: string;
  initialIsFollowing?: boolean;
  className?: string;
}

export function FollowButton({
  username,
  initialIsFollowing = false,
  className,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function handleSync(e: CustomEvent) {
      if (e.detail.username === username) {
        setIsFollowing(e.detail.isFollowing);
      }
    }

    window.addEventListener("followChange", handleSync as EventListener);
    return () =>
      window.removeEventListener("followChange", handleSync as EventListener);
  }, [username]);

  async function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);
    const newStatus = !isFollowing;

    try {
      if (isFollowing) {
        await api.post(`/users/${username}/unfollow/`);
      } else {
        await api.post(`/users/${username}/follow/`);
      }

      setIsFollowing(newStatus);

      window.dispatchEvent(
        new CustomEvent("followChange", {
          detail: { username, isFollowing: newStatus },
        }),
      );
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ButtonContainer
      $isFollowing={isFollowing}
      onClick={handleClick}
      className={className}
      disabled={isLoading}
    >
      {isFollowing ? (
        <>
          <span className="text-following">Seguindo</span>
          <span className="text-unfollow">Deixar de seguir</span>
        </>
      ) : (
        <span>Seguir</span>
      )}
    </ButtonContainer>
  );
}
