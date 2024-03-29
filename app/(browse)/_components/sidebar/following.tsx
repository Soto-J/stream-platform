"use client";

import { useSidebar } from "@/store/use-sidebar";

import { FollowsUserWithIsLive } from "@/lib/follow-service";

import { UserItem, UserItemSkeleton } from "./user-item";

type FollowingProps = {
  data: FollowsUserWithIsLive[];
};

export const Following = ({ data = [] }: FollowingProps) => {
  const { collapsed } = useSidebar();

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className="mb-4 pl-6">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}

      <ul>
        {data.map((follow) => (
          <UserItem
            key={follow.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(5)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
