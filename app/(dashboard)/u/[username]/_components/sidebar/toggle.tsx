"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { useCreatorSidebar } from "@/store/use-creator-sidebar";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Toggle = () => {
  const { isCollapsed, onExpand, onCollapse } = useCreatorSidebar(
    (state) => state,
  );

  const label = isCollapsed ? "Expand" : "Collapse";

  if (isCollapsed) {
    return (
      <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
        <Hint asChild label={label} side="right">
          <Button onClick={onExpand} variant="ghost" className="h-auto p-2">
            <ArrowRightFromLine className="h-4 w-4" />
          </Button>
        </Hint>
      </div>
    );
  }

  return (
    <div className="mb-2 hidden w-full items-center p-3 pl-6 lg:flex">
      <p className="font-semibold text-primary">Dashboard</p>
      <Hint asChild label={label} side="right">
        <Button
          onClick={onCollapse}
          variant="ghost"
          className="ml-auto h-auto p-2"
        >
          <ArrowLeftFromLine className="h-4 w-4" />
        </Button>
      </Hint>
    </div>
  );

  // return (
  //   <div
  //     className={cn(
  //       isCollapsed
  //         ? "mb-4 hidden w-full items-center justify-center pt-4 lg:flex"
  //         : "mb-2 hidden w-full items-center p-3 pl-6 lg:flex",
  //     )}
  //   >
  //     {!isCollapsed && <p className="font-semibold text-primary">Dashboard</p>}
  //     <Hint asChild label={label} side="right">
  //       <Button
  //         onClick={isCollapsed ? onExpand : onCollapse}
  //         variant="ghost"
  //         className={cn(isCollapsed ? "h-auto p-2" : "ml-auto h-auto p-2")}
  //       >
  //         {isCollapsed ? (
  //           <ArrowRightFromLine className="h-4 w-4" />
  //         ) : (
  //           <ArrowLeftFromLine className="h-4 w-4" />
  //         )}
  //       </Button>
  //     </Hint>
  //   </div>
  // );
};
