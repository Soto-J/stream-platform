"use client";

import {
  useState,
  useTransition,
  useRef,
  ElementRef,
  FormEvent,
  ChangeEvent,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

import { updateStream } from "@/actions/stream";

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
import { Hint } from "@/components/hint";
import { Trash } from "lucide-react";

type InfoModalProps = {
  streamName: string;
  thumbnailUrl: string | null;
};

export const InfoModal = ({ streamName, thumbnailUrl }: InfoModalProps) => {
  const [newStreamName, setNewStreamName] = useState(streamName);
  const [newThumbnailUrl, setNewThumbnailUrl] = useState(thumbnailUrl);

  const [isPending, startTransition] = useTransition();

  const closeRef = useRef<ElementRef<"button">>(null);

  const router = useRouter();

  const onRemoveThumbnail = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => toast.success(`Thumbnail removed!`))
        .catch((error) => toast.error(error.message));
    });
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
              onChange={(e) => setNewStreamName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Thumbnail</Label>

            {thumbnailUrl ? (
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
                <div className="absolute right-2 top-2 z-10">
                  <Hint asChild label="Remove thumbnail" side="left">
                    <Button
                      onClick={onRemoveThumbnail}
                      disabled={isPending}
                      type="button"
                      variant="ghost"
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>

                <Image
                  fill
                  src={thumbnailUrl}
                  alt={streamName}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  onClientUploadComplete={(res) => {
                    setNewThumbnailUrl(res?.[0]?.url);
                    router.refresh();
                  }}
                  appearance={{
                    label: { color: "#FFFFFF" },
                    allowedContent: { color: "#FFFFFF" },
                  }}
                />
              </div>
            )}
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
