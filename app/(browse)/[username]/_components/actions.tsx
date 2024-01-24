"use client";

import { useTransition } from "react";

import { onFollow, onUnfollow } from "@/actions/follow";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

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

  const onClick = isFollowing ? handleUnfollow : handleFollow;
  
  const label = isFollowing ? "Unfollow" : "Follow";

  return (
    <Button onClick={onClick} variant="primary" disabled={isPending}>
      {label}
    </Button>
  );
};
