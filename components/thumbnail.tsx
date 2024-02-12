import Image from "next/image";

import { UserAvatar } from "./user-avatar";
import { Skeleton } from "./ui/skeleton";

import { LiveBadge } from "@/components/live-badge";

type ThumbnailProps = {
  src: string | null;
  fallbackUrl: string;
  isLive: boolean;
  username: string;
};

export const Thumbnail = ({
  src,
  fallbackUrl,
  isLive,
  username,
}: ThumbnailProps) => {
  return (
    <div className="group relative aspect-video cursor-pointer rounded-md">
      <div className="absolute inset-0 flex items-center justify-center rounded-md bg-blue-600 opacity-0 transition-opacity group-hover:opacity-100" />

      {!!src ? (
        <Image
          fill
          src={src}
          alt="Stream thumbnail"
          className="rounded-md object-cover group-hover:-translate-y-2 group-hover:translate-x-2"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center rounded-md bg-background transition-transform group-hover:-translate-y-2 group-hover:translate-x-2">
          <UserAvatar
            showBadge
            imageUrl={fallbackUrl}
            username={username}
            isLive={isLive}
            size="lg"
          />
        </div>
      )}

      {isLive && (
        <div className="absolute left-2 top-2 transition-transform group-hover:translate-x-2 group-hover:translate-y-2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

export const ThumbnailSkeleton = () => {
  return (
    <div className="group relative aspect-video cursor-pointer rounded-xl">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
