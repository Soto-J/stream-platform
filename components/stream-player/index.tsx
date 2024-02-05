"use client";

import { type CustomStream, type UserWithStream } from "@/lib/user-service";
import { cn } from "@/lib/utils";

import { useChatSidebar } from "@/store/use-chat-sidebar";
import { userViewToken } from "@/hooks/use-viewer-token";

import { LiveKitRoom } from "@livekit/components-react";

import { Video } from "./video";
import { Chat } from "./chat";
import { ChatToggle } from "./chat/chat-toggle";

type StreamPlayerProps = {
  user: UserWithStream;
  stream: CustomStream;
  isFollowing: boolean;
};

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { isCollapsed } = useChatSidebar();

  const { token, identity, name } = userViewToken(user.id);

  if (!token || !identity || !name) {
    return <div>Cannot watch stream</div>;
  }

  return (
    <>
      {isCollapsed && (
        <div className="fixed right-2 top-[100px] z-50 hidden lg:block">
          <ChatToggle />
        </div>
      )}

      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6",
          isCollapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2",
        )}
      >
        <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>

        <div className={cn("col-span-1", isCollapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatFollowersOnly={stream.isChatFollowersOnly}
            isChatDelayed={stream.isChatDelayed}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};
