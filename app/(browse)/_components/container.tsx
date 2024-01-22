"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";

import { useSidebar } from "@/store/use-sidebar";

type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  const maxWidth = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (maxWidth) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [maxWidth, onCollapse, onExpand]);

  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};
