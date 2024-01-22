import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LiveBadge } from "@/components/live-badge";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type UserAvatarProps = {
  imageUrl: string;
  username: string;
  isLive?: boolean;
  showBadge?: boolean;
} & VariantProps<typeof avatarSizes>;

export const UserAvatar = ({
  imageUrl,
  username,
  isLive,
  showBadge,
  size,
}: UserAvatarProps) => {
  const canShowBadge = isLive && showBadge;

  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "border border-background ring-2 ring-rose-500",
          avatarSizes({ size }),
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>

      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

type UserAvatarSkeletonProps = {} & VariantProps<typeof avatarSizes>;

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
  return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
};
