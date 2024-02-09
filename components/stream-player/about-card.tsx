import { AboutModal } from "./about-modal";

import { VerifiedMark } from "@/components/verified-mark";

type AboutCardProps = {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
};

export const AboutCard = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
  followedByCount,
}: AboutCardProps) => {
  const isHost = viewerIdentity.includes("host");

  const followedByLabel = followedByCount === 1 ? "follower" : "followers";

  return (
    <div className="px-4">
      <div className="group flex flex-col gap-y-3 rounded-xl bg-background p-4 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 text-lg font-semibold lg:text-2xl">
            About {hostName}
            <VerifiedMark />
          </div>

          {isHost && <AboutModal bio={bio} />}
        </div>

        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">
            {followedByCount} {followedByLabel}
          </span>
        </div>

        <p className="text-sm">{bio || "This user has not set a bio yet."}</p>
      </div>
    </div>
  );
};
