"use client";

import { type ReceivedChatMessage } from "@livekit/components-react";
import { format } from "date-fns";

import { stringToColor } from "@/lib/utils";

type ChatMessageProps = {
  data: ReceivedChatMessage;
};

export const ChatMessage = ({ data }: ChatMessageProps) => {
  const color = stringToColor(data.from?.name || "");
  const timeStamp = format(data.timestamp, "HH: MM");

  return (
    <div className="flex gap-2 rounded-md p-2 hover:bg-white/5">
      <p className="text-sm text-white/40">{timeStamp}</p>

      <div className="flex grow flex-wrap items-baseline gap-1">
        <p className="whitespace-nowrap text-sm font-semibold">
          <span className="truncate" style={{ color: color }}>
            {data.from?.name}:{" "}
          </span>
        </p>

        <p className="break-all text-sm">{data.message}</p>
      </div>
    </div>
  );
};
