"use client";

import { userViewToken } from "@/hooks/use-viewer-token";

import { UserWithIsLive } from "@/lib/recommended-service";
import { LiveKitRoom } from "@livekit/components-react";
import { Video } from "./video";

type StreamPlayerProps = {
  user: UserWithIsLive;
  stream: {
    isLive: boolean;
  };
  isFollowing: boolean;
};

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, identity, name } = userViewToken(user.id);

  if (!token || !identity || !name) {
    return <div>Cannot watch stream</div>;
  }

  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className="grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6"
      >
        <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>
      </LiveKitRoom>
    </>
  );
};
