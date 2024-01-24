import { getRecommendedService } from "@/lib/recommended-service";
import { getFollowedUsers } from "@/lib/follow-service";

import { Wrapper } from "./wrapper";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Following, FollowingSkeleton } from "./following";

export const Sidebar = async () => {
  const recommended = await getRecommendedService();
  const following = await getFollowedUsers();

  return (
    <Wrapper>
      <Toggle />

      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2d2e35] bg-background lg:w-60">
      <ToggleSkeleton />

      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
