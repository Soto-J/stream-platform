import { currentUser } from "@clerk/nextjs";

import { getUserByUsername } from "@/lib/user-service";

import { StreamPlayer } from "@/components/stream-player";

type CreatorPageProps = {
  params: { username: string };
};

export default async function CreatorPage({ params }: CreatorPageProps) {
  const clerkUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || clerkUser?.id !== user?.externalUserId || !user.stream) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      <StreamPlayer isFollowing user={user} stream={user.stream} />
    </div>
  );
}
