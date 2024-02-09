"use client";

import {
  useState,
  useTransition,
  useRef,
  ElementRef,
  FormEvent,
  ChangeEvent,
} from "react";

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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateStream } from "@/actions/stream";
import { UploadDropzone } from "@/lib/uploadthing";

type InfoModalProps = {
  streamName: string;
  thumbnailUrl: string | null;
};

export const InfoModal = ({ streamName, thumbnailUrl }: InfoModalProps) => {
  const [newStreamName, setNewStreamName] = useState(streamName);
  const [newThumbnailUrl, setNewThumbnailUrl] = useState(thumbnailUrl);

  const [isPending, startTransition] = useTransition();

  const closeRef = useRef<ElementRef<"button">>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewStreamName(e.target.value);
  };

  const onSubumit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name: newStreamName })
        .then((data) => {
          toast.success(`Stream updated to ${data.name}!`);
          closeRef?.current?.click();
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubumit} className="space-y-14">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Stream name"
              disabled={isPending}
              value={newStreamName}
              onChange={onChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Thumbnail</Label>

            <div className="rounded-xl border outline-dashed outline-muted">
              <UploadDropzone endpoint="thumbnailUploader" />
            </div>
          </div>

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
