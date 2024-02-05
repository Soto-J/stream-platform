"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatInfo } from "./chat-info";

type ChatFormProps = {
  onSubmit: () => void;
  onChange: (value: string) => void;
  value: string;
  isFollowing: boolean;
  isFollowersOnly: boolean;
  isDelayed: boolean;
  isHidden: boolean;
};

export const ChatForm = ({
  onSubmit,
  onChange,
  value,
  isHidden,
  isFollowersOnly,
  isDelayed,
  isFollowing,
}: ChatFormProps) => {
  const [isDelayedBlocked, setIsDelayedBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;

  const isDisabled = isHidden || isFollowersOnlyAndNotFollowing || isDelayed;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) {
      return;
    }

    if (isDelayed && !isDelayedBlocked) {
      setIsDelayedBlocked(true);

      setTimeout(() => {
        setIsDelayedBlocked(false);

        onSubmit();
      }, 3000);
      return;
    }

    onSubmit();
  };

  console.log("isHidden", isHidden);

  if (isHidden) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <ChatInfo />
      <Input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        disabled={isDisabled}
        placeholder="Send a message"
        className={cn(
          "border-white/10",
          isFollowersOnly && "rounded-t-none border-t-0",
        )}
      />

      <Button type="submit" variant="primary" size="sm" className="ml-auto">
        chat
      </Button>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flexe-col flex items-center gap-y-4 p-3">
      <Skeleton className="h-10 w-full" />
      <div className="ml-auto flex items-center gap-x-2">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};
