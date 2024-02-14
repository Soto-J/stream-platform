"use client";

import { useTransition } from "react";

import { onUnBlockUser } from "@/actions/block";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type UnblockButtonProps = {
  userId: string;
};

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onUnblock = () => {
    startTransition(() => {
      onUnBlockUser(userId)
        .then((data) => toast.success(`Unblocked ${data.blocked.username}`))
        .catch((error) => toast.error(error.message));
    });
  };

  return (
    <Button
      onClick={onUnblock}
      disabled={isPending}
      variant="link"
      size="sm"
      className="text-blue-500"
    >
      Unblock
    </Button>
  );
};
