import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";

import { ConnectModal } from "./_components/connect-modal";
import { UrlCard } from "./_components/url-card";
import { KeyCard } from "./_components/key-card";

import { CheckHydration } from "@/components/check-hydration";

export default async function KeyPage() {
  const self = await getSelf();

  if (!self) {
    throw new Error("Unauthorized");
  }

  const stream = await getStreamByUserId(self.id);
  
  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>

        <ConnectModal />
      </div>

      <div className="space-y-4">
        <CheckHydration>
          <UrlCard value={stream.serverUrl} />
          <KeyCard value={stream.streamKey} />
        </CheckHydration>
      </div>
    </div>
  );
}
