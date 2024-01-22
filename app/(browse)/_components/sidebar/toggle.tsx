"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";

export const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  if (collapsed) {
    return (
      <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
        <Hint label={label} side="right" asChild={true}>
          <Button onClick={onExpand} className="h-auto p-2" variant="ghost">
            <ArrowRightFromLine size={16} />
          </Button>
        </Hint>
      </div>
    );
  }

  return (
    <div className="mb-2 flex w-full items-center p-3 pl-6">
      <p className="font-semibold text-primary">For you</p>

      <Hint label={label} side="right" asChild={true}>
        <Button onClick={onCollapse} className="ml-auto p-2" variant="ghost">
          <ArrowLeftFromLine size={16} />
        </Button>
      </Hint>
    </div>
  );
};

export const ToggleSkeleton = () => {
  return (
    <div className="mb-2 hidden w-full items-center justify-between p-3 pl-6 lg:flex">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-6 w-6" />
    </div>
  );
};
