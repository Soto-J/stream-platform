import { Hint } from "@/components/hint";
import { Info } from "lucide-react";
import { useMemo } from "react";

type ChatInfoProps = {
  isDelayed: boolean;
  isFollowersOnly: boolean;
};

export const ChatInfo = ({ isDelayed, isFollowersOnly }: ChatInfoProps) => {
  const hintLabel = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Only followers can chat";
    }

    if (!isFollowersOnly && isDelayed) {
      return "Chat is delayed by 3 seconds";
    }

    if (isFollowersOnly && isDelayed) {
      return "Only followers can chat. Messages are delayed by 3 seconds";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  const content = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Followers only";
    }

    if (!isFollowersOnly && isDelayed) {
      return "Slow mode";
    }

    if (isFollowersOnly && isDelayed) {
      return "Followers and slow mode";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) {
    return null;
  }

  return (
    <div className="flex w-full items-center gap-x-2 rounded-t-md border border-white/10 bg-white/5 p-2 text-muted-foreground">
      <Hint label={hintLabel}>
        <Info className="h-4 w-4" />
      </Hint>

      <p className="text-sm font-semibold">{content}</p>
    </div>
  );
};
