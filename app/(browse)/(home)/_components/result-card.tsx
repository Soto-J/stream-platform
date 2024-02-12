import Link from "next/link";

import { type StreamWithUser } from "@/lib/stream-service";

import { Thumbnail } from "@/components/thumbnail";
import { LiveBadge } from "@/components/live-badge";

type ResultCardProps = {
  stream: StreamWithUser;
};

export const ResultCard = ({ stream }: ResultCardProps) => {
  return (
    <Link href={`/${stream.user.username}`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={stream.thumbnailUrl}
          fallbackUrl={stream.user.imageUrl}
          isLive={stream.isLive}
          username={stream.user.username}
        />

        {stream.isLive && (
          <div className="absolute left-2 top-2 transition-transform group-hover:translate-x-2 group-hover:translate-y-2">
            <LiveBadge />
          </div>
        )}
      </div>
    </Link>
  );
};
