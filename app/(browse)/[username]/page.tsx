import { notFound } from "next/navigation";

import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { isBlockedByUser, isBlockingUser } from "@/lib/block-service";

import { StreamPlayer } from "@/components/stream-player";

type UserPageProps = {
  params: { username: string };
};

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    return notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocking = await isBlockingUser(user.id);

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <StreamPlayer
          user={user}
          stream={user.stream}
          isFollowing={isFollowing}
          isBlocking={isBlocking}
        />
      </div>
    </div>
  );
}
