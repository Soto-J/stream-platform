import Link from "next/link";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

import { useCreatorSidebar } from "@/store/use-creator-sidebar";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type NavItemProps = {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
};

export const NavItem = ({
  label,
  href,
  icon: Icon,
  isActive,
}: NavItemProps) => {
  const { isCollapsed } = useCreatorSidebar((state) => state);

  return (
    <li>
      <Button
        asChild
        variant="ghost"
        className={cn(
          "h-12 w-full",
          isCollapsed ? "justify-center" : "justify-start",
          isActive && "bg-accent",
        )}
      >
        <Link href={href} className="flex items-center gap-x-4">
          <Icon className={cn("h-4 w-4", isCollapsed ? "mr-0" : "mr-2")} />
          {!isCollapsed && <span>{label}</span>}
        </Link>
      </Button>
    </li>
  );
};

export const NavItemSkeleton = () => {
  return (
    <li className="mt-2 flex items-center gap-x-4 px-3 py-2 lg:mt-0">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />

      <div className="hidden flex-1 lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
