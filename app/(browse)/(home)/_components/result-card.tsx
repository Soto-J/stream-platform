import Link from "next/link";

import { type StreamWithUser } from "@/lib/stream-service";

import { LiveBadge } from "@/components/live-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";

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

        <div className="flex gap-x-3">
          <UserAvatar
            username={stream.user.username}
            imageUrl={stream.user.imageUrl}
            isLive={stream.isLive}
          />
          <div className="flex flex-col overflow-hidden text-sm">
            <p className="truncate font-semibold hover:text-blue-500">
              {stream.name}
            </p>
            <p className="text-muted-foreground">{stream.user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />

      <div className="flex gap-x-3">
        <UserAvatarSkeleton />

        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};
