"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type AboutModalProps = {
  bio: string | null;
};

export const AboutModal = ({ bio }: AboutModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className="ml-auto h-auto w-auto text-sm"
        >
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <div className="">{bio}</div>
      </DialogContent>
    </Dialog>
  );
};
