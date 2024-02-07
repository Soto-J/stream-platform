"use client";

import { useTransition } from "react";
import { onBlockUser } from "@/actions/block";

import { cn, stringToColor } from "@/lib/utils";

import { MinusCircle } from "lucide-react";
import { toast } from "sonner";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

type CommunityItemProps = {
  hostName: string;
  viewerName: string;
  partipantName?: string;
  participantIdentity: string;
};

export const CommunityItem = ({
  hostName,
  viewerName,
  partipantName,
  participantIdentity,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();

  const color = stringToColor(partipantName || "");
  const isSelf = partipantName === viewerName;
  const isHost = hostName === viewerName;

  const handleBlock = () => {
    if (!partipantName || isSelf || !isHost) {
      return;
    }

    startTransition(() => {
      onBlockUser(participantIdentity)
        .then(() => toast.success(`Blocked ${partipantName}`))
        .catch((error) => toast.error(error.message));
    });
  };

  return (
    <div
      className={cn(
        "group flex w-full items-center justify-between rounded-md p-2 text-sm hover:bg-white/5",
        isPending && "pointer-events-none opacity-50",
      )}
    >
      <p style={{ color }}>{partipantName}</p>

      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            onClick={handleBlock}
            disabled={isPending}
            variant="ghost"
            className="h-auto w-auto p-1 opacity-0 transition group-hover:opacity-100"
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};
