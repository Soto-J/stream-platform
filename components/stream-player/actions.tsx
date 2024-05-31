"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { useAuth } from "@clerk/nextjs";

import { onFollow, onUnfollow } from "@/actions/follow";

import { toast } from "sonner";

import { Heart, MoreVerticalIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { onBlockUser, onUnBlockUser } from "@/actions/block";

type ActionsProps = {
  isFollowing: boolean;
  isBlocking?: boolean;
  isHost: boolean;
  hostIdentity: string;
};

export const Actions = ({
  isFollowing,
  isBlocking,
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

  const toggleBlock = () => {
    if (!userId) {
      return router.push("/sign-in");
    }

    if (isHost) {
      return;
    }

    startTransition(() => {
      if (isBlocking) {
        onUnBlockUser(hostIdentity)
          .then((data) =>
            toast.success(`Sucessfully unblocked ${data.blocked.username}.`),
          )
          .catch((error) => toast.error(error.message));
      } else {
        onBlockUser(hostIdentity)
          .then((data) =>
            toast.success(`Sucessfully blocked ${data?.blocked.username}.`),
          )
          .catch((error) => toast.error(error.message));
      }
    });
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={toggleFollow}
        disabled={isPending || isHost || isBlocking}
        variant="primary"
        size="lg"
        className="w-full lg:w-auto"
      >
        <Heart
          className={cn(
            "mr-2 h-4 w-4",
            isFollowing ? "fill-white" : "fill-none",
          )}
        />

        {isFollowing ? "Unfollow" : "Follow"}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="top" className="text-center">
          <DropdownMenuItem onClick={toggleBlock} disabled={isPending}>
            {isBlocking ? "Unblock" : "Block"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const ActionsSkeleton = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Skeleton className="h-10 w-full lg:w-24" />
      <Skeleton className="h-10 w-full lg:w-24" />
    </div>
  );
};
