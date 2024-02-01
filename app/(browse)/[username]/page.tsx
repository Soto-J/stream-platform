import { notFound } from "next/navigation";

import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";

import { Actions } from "./_components/actions";

type UserPageProps = {
  params: {
    username: string;
  };
};

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlockedByThisUser = await isBlockedByUser(user.id);

  if (isBlockedByThisUser) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p>User: {user.username}</p>
      <p>Is Following: {`${isFollowing}`}</p>
      <p>User: {user.username}</p>

      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
};

export default UserPage;
