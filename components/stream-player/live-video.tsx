"use client";

import { useEffect, useRef, useState } from "react";

import { useEventListener } from "usehooks-ts";

import { Participant, Track } from "livekit-client";
import { useTracks } from "@livekit/components-react";

import { FullscreenControl } from "./controls/fullscreen-control";
import { VolumeControl } from "./controls/volume-control";

type LiveVideoProps = {
  participant: Participant;
};

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);
  const [volumeBeforMute, setVolumeBeforeMute] = useState(volume);

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

  const onVolumeChange = (volume: number) => {
    setVolume(+volume);

    if (videoRef.current) {
      videoRef.current.muted = volume === 0;
      videoRef.current.volume = +volume * 0.01;
    }
  };

  const onToggleMute = () => {
    const isMuted = volume === 0;

    if (!isMuted) {
      setVolumeBeforeMute(volume);
    }

    setVolume(isMuted ? volumeBeforMute || 1 : 0);

    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? volumeBeforMute * 0.01 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

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
          <VolumeControl
            onToggle={onToggleMute}
            onChange={onVolumeChange}
            volume={volume}
          />
        </div>
      </div>
    </div>
  );
};
