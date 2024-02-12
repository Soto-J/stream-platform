"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { useAuth } from "@clerk/nextjs";

import { onFollow, onUnfollow } from "@/actions/follow";

import { toast } from "sonner";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type ActionsProps = {
  isFollowing: boolean;
  isHost: boolean;
  hostIdentity: string;
};

export const Actions = ({
  isFollowing,
  isHost,
  hostIdentity,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();

  const toggleFollow = () => {
    if (!userId) {
      return router.push("/sign-in");
    }

    if (isHost) {
      return;
    }

    startTransition(() => {
      if (isFollowing) {
        onUnfollow(hostIdentity)
          .then((data) =>
            toast.success(`Succesfully unfollowed ${data.following.username}!`),
          )
          .catch((error) =>
            toast.error(`Failed to unfollow: ${error.message}`),
          );
      } else {
        onFollow(hostIdentity)
          .then((data) =>
            toast.success(`Succesfully followed ${data.following.username}!`),
          )
          .catch((error) => toast.error(`Failed to follow: ${error.mesaage}`));
      }
    });
  };

  return (
    <Button
      onClick={toggleFollow}
      disabled={isPending || isHost}
      variant="primary"
      size="lg"
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn("mr-2 h-4 w-4", isFollowing ? "fill-white" : "fill-none")}
      />

      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
