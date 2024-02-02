"use client";

import { useTransition } from "react";

import { updateStream } from "@/actions/stream";

import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

type ToggleCardProps = {
  field: FieldTypes;
  label: string;
  value: boolean;
};

export const ToggleCard = ({
  field,
  label,
  value = false,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  const onChange = async () => {
    const toastLabel = {
      isChatEnabled: "Chat",
      isChatDelayed: "Delay",
      isChatFollowersOnly: "Followers only",
    }[field];

    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() =>
          toast.success(`${toastLabel} ${value ? "disabled" : "enabled"}.`),
        )
        .catch(() => toast.error("Failed to update chat settings"));
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{label}</p>

        <div className="space-y-2">
          <Switch
            onCheckedChange={onChange}
            checked={value}
            disabled={isPending}
          >
            {value ? "Enabled" : "Disabled"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="w-full rounded-xl p-10" />;
};
