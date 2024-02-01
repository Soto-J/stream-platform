"use client";

import { useTransition } from "react";

import { onFollow, onUnfollow } from "@/actions/follow";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { onBlockUser, onUnBlockUser } from "@/actions/block";

type ActionsProps = {
  isFollowing: boolean;
  userId: string;
};

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`),
        )
        .catch((error) => toast.error(error.message));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`),
        )
        .catch((error) => toast.error(error.message));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlockUser(userId)
        .then((data) => {
          toast.success(`You have blocked ${data.blocked.username}`);
        })
        .catch((error) => toast.error(error.message));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnBlockUser(userId)
        .then((data) => {
          toast.success(`You have unblocked ${data.blocked.username}`);
        })
        .catch((error) => toast.error(error.message));
    });
  };

  const followLabel = isFollowing ? "Unfollow" : "Follow";
  const onClick = isFollowing ? handleUnfollow : handleFollow;

  // const blockLabel = isBlock ? "Unblock" : "Block";
  const onBlock = isFollowing ? handleUnblock : handleBlock;

  return (
    <>
      <Button onClick={onClick} variant="primary" disabled={isPending}>
        {followLabel}
      </Button>

      <Button onClick={handleUnblock} disabled={isPending}>
        unblock
      </Button>
      <Button onClick={handleBlock} disabled={isPending}>
        block
      </Button>
    </>
  );
};
