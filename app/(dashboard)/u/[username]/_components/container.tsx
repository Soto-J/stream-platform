"use client";

import { useEffect } from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";

import { useCreatorSidebar } from "@/store/use-creator-sidebar";

type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  const { isCollapsed, onExpand, onCollapse } = useCreatorSidebar(
    (state) => state,
  );

  const matches = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn("flex-1", isCollapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};
