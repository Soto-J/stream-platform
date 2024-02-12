import Link from "next/link";

import { formatDistanceToNow } from "date-fns";

import { Thumbnail } from "@/components/thumbnail";
import { StreamWithUser } from "@/lib/stream-service";
import { VerifiedMark } from "@/components/verified-mark";

type ResultCardProps = {
  stream: StreamWithUser;
};

export const ResultCard = ({ stream }: ResultCardProps) => {
  return (
    <Link href={`/${stream.user.username}`}>
      <div className="flex w-full gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={stream.thumbnailUrl}
            fallbackUrl={stream.user.imageUrl}
            isLive={stream.isLive}
            username={stream.user.username}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="cursor-pointer text-lg font-bold hover:text-blue-500">
              {stream.user.username}
            </p>

            <VerifiedMark />
          </div>

          <p className="text-sm text-muted-foreground">{stream.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(stream.updatedAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};
