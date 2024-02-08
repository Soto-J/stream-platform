"use client";

import { ChangeEvent, useMemo, useState } from "react";

import { useDebounce } from "usehooks-ts";

import { LocalParticipant, RemoteParticipant } from "livekit-client";

import { useParticipants } from "@livekit/components-react";

import { CommunityItem } from "./community-item";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type ChatCommunityProps = {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
};

export const ChatCommunity = ({
  viewerName,
  hostName,
  isHidden,
}: ChatCommunityProps) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  const participants = useParticipants();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce(
      (acc, participant) => {
        const hostAsViewer = `host-${participant.identity}`;
        const isNotHostAsViewer = !acc.some((p) => p.identity === hostAsViewer);
  
        if (isNotHostAsViewer) {
          acc.push(participant);
        }

        return acc;
      },
      [] as (RemoteParticipant | LocalParticipant)[],
    );

    return deduped.filter(
      (participant) =>
        participant.name?.toLowerCase().includes(debouncedValue.toLowerCase()),
    );
  }, [debouncedValue, participants]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        value={value}
        onChange={onChange}
        placeholder="Search Community"
        className="border-white/10"
      />

      <ScrollArea className="mt-4 gap-y-2">
        <p className="hidden p-2 text-center text-sm text-muted-foreground last:block">
          No results
        </p>

        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            partipantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
