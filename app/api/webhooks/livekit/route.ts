import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";

import { db } from "@/lib/db";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

export async function POST(req: Request) {
  const headerPayload = headers();
  const autherization = headerPayload.get("authorization");

  if (!autherization) {
    return new Response("Error occured -- no authorization header", {
      status: 400,
    });
  }

  const body = await req.text();

  const event = receiver.receive(body, autherization);

  if (event.event === "ingress_started") {
    await db.stream.update({
      where: { ingressId: event.ingressInfo?.ingressId },
      data: { isLive: true },
    });
  }

  if (event.event === "ingress_ended") {
    await db.stream.update({
      where: { ingressId: event.ingressInfo?.ingressId },
      data: { isLive: false },
    });
  }

  return new Response("OK", { status: 200 });
}

export async function GET(req: Request) {
  return new Response("Testing", { status: 200 });
}
