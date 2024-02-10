"use client";

import { ElementRef, FormEvent, useRef, useState, useTransition } from "react";

import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/actions/user";

type AboutModalProps = {
  bio: string | null;
};

export const AboutModal = ({ bio }: AboutModalProps) => {
  const [newBio, setNewBio] = useState(bio || "");
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({ bio: newBio })
        .then((data) => {
          toast.success("Bio updated!");
          closeRef.current?.click();
        })
        .catch((error) => toast.error(error.message));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[98%]">
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            disabled={isPending}
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            placeholder="User bio"
            className="resize-none"
          />

          <div className="flex justify-between">
            <DialogClose asChild>
              <Button ref={closeRef} type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={isPending} type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
