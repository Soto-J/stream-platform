import { notFound } from "next/navigation";

import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";

import { Actions } from "./_components/actions";
import { StreamPlayer } from "@/components/stream-player";

type UserPageProps = {
  params: { username: string };
};

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserByUsername(params.username);
  console.log("users", user?._count);
  if (!user || !user.stream) {
    notFound();
  }

  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    return notFound();
  }

  const isFollowing = await isFollowingUser(user.id);

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <StreamPlayer
          user={user}
          stream={user.stream}
          isFollowing={isFollowing}
        />
      </div>

      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
}
