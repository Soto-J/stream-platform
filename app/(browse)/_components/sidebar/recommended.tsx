"use client";

import { useSidebar } from "@/store/use-sidebar";
import { type User } from "@prisma/client";

import { UserItem, UserItemSkeleton } from "./user-item";

type RecommendedServiceProps = {
  data: User[];
};

export const Recommended = ({ data }: RecommendedServiceProps) => {
  const { collapsed } = useSidebar();
  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="mb-4 pl-6">
          <p className="text-sm text-muted-foreground">Recommeded</p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={true}
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
