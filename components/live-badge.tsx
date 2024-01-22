import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const liveBadgeVariants = cva("", {
  variants: {
    variant: {
      default: "bg-rose-500 text-rose-50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type LiveBadgeProps = {
  className?: string;
};

export const LiveBadge = ({ className }: LiveBadgeProps) => {
  return (
    <div
      className={cn(
        "rounded-md border border-background bg-rose-500 px-1.5 py-0.5 text-center text-[10px] font-semibold uppercase tracking-wide",
        className,
        liveBadgeVariants({ variant: "default" }),
      )}
    >
      Live
    </div>
  );
};
