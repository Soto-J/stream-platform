"use client";

import { useSidebar } from "@/store/use-sidebar";

import { UserItem, UserItemSkeleton } from "./user-item";
import { type UserWithStream } from "@/lib/recommended-service";

type RecommendedServiceProps = {
  data: UserWithStream[];
};

export const Recommended = ({ data }: RecommendedServiceProps) => {
  const { collapsed } = useSidebar();
  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="mb-4 pl-6">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(5)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
