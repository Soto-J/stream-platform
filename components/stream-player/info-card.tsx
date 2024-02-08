"use client";

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

  return <div>InfoCard</div>;
};
