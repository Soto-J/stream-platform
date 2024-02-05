"use client";

import { useRef, useState } from "react";

import { useEventListener } from "usehooks-ts";

import { Participant, Track } from "livekit-client";
import { useTracks } from "@livekit/components-react";

import { FullscreenControl } from "./fullscreen-control";

type LiveVideoProps = {
  participant: Participant;
};

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const onToggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  };

  // Handles when the user exits fullscreen then re-enters fullscreen
  // TypeError: Failed to execute 'exitFullscreen' on 'Document': Document not active.
  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  return (
    <div ref={wrapperRef} className="relative flex h-full">
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <FullscreenControl
            isFullscreen={isFullscreen}
            onToggle={onToggleFullscreen}
          />
        </div>
      </div>
    </div>
  );
};
