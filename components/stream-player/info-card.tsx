"use client";

import { Pencil } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { InfoModal } from "./info-modal";

type InfoCardProps = {
  hostIdentity: string;
  viewerIdentity: string;
  streamName: string;
  thumbnailUrl: string | null;
};

export const InfoCard = ({
  hostIdentity,
  viewerIdentity,
  streamName,
  thumbnailUrl,
}: InfoCardProps) => {
  const isHost = viewerIdentity.includes("host");

  if (!isHost) return null;

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="h-auto w-auto rounded-md bg-blue-600 p-2">
            <Pencil className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold capitalize lg:text-lg">
              Edit your stream info
            </h2>
            <p className="text-xs text-muted-foreground lg:text-sm">
              Maximize your visibility
            </p>
          </div>

          <InfoModal streamName={streamName} thumbnailUrl={thumbnailUrl} />
        </div>

        <Separator />

        <div className="space-y-4 p-4 lg:p-6">
          <div>
            <h3 className="mb-2 text-sm text-muted-foreground">Thumbnail</h3>

            {thumbnailUrl && (
              <div className="relative aspect-video w-[200px] overflow-hidden rounded-md border border-white/10">
                <Image
                  fill
                  src={thumbnailUrl}
                  alt={streamName}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
