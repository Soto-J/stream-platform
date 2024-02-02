import { getSelf } from "@/lib/auth-service";

import { UrlCard } from "./_components/url-card";
import { KeyCard } from "./_components/key-card";

import { Button } from "@/components/ui/button";
import { getStreamByUserId } from "@/lib/stream-service";

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

        <Button variant="primary">Generate</Button>
      </div>

      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
}
