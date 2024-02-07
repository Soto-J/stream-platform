"use client";

import { useEffect, useMemo, useState } from "react";

import { useMediaQuery } from "usehooks-ts";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";

import { ConnectionState } from "livekit-client";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";

import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";

type ChatProps = {
  viewerName: string;
  hostIdentity: string;
  hostName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatFollowersOnly: boolean;
  isChatDelayed: boolean;
};

export const Chat = ({
  viewerName,
  hostIdentity,
  hostName,
  isFollowing,
  isChatEnabled,
  isChatFollowersOnly,
  isChatDelayed,
}: ChatProps) => {
  const [value, setValue] = useState("");

  const { variant, onExpand } = useChatSidebar((state) => state);

  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const matches = useMediaQuery("(max-width: 1024px)");

  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reversedMessages = useMemo(
    () => messages.sort((a, b) => b.timestamp - a.timestamp),
    [messages],
  );

  const onSubmit = () => {
    if (!send) {
      return;
    }

    send(value);
    setValue("");
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col border-b border-l bg-background pt-0">
      <ChatHeader />

      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            onChange={onChange}
            value={value}
            isFollowing={isFollowing}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isHidden={isHidden}
          />
        </>
      )}

      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity
          viewerName={viewerName}
          hostName={hostName}
          isHidden={isHidden}
        />
      )}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex h-[calc(100vh-80px)] flex-col border-2 border-b border-l pt-0">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
