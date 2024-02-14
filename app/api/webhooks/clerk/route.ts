import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { resetIngresses } from "@/actions/ingress";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;

  console.log({ eventData: evt.data });

  if (eventType === "user.created") {
    await db.user.create({
      data: {
        externalUserId: evt.data.id,
        username: evt.data.username!,
        imageUrl: evt.data.image_url,
        stream: {
          create: {
            name: `${evt.data.username}'s stream`,
          },
        },
      },
    });
  }

  if (eventType === "user.updated") {
    const user = await db.user.findUnique({
      where: {
        externalUserId: evt.data.id,
      },
    });

    if (!user) {
      return new Response("Error occured", {
        status: 400,
      });
    }

    console.log({ user });
    await db.user.update({
      where: {
        externalUserId: evt.data.id,
      },
      data: {
        username: evt.data.username || "",
        imageUrl: evt.data.image_url,
      },
    });
  }

  if (eventType === "user.deleted") {
    // End stream if user is deleted
    await resetIngresses(payload.data.id);

    await db.user.delete({
      where: {
        externalUserId: evt.data.id,
      },
    });
  }

  return new Response("Received", { status: 200 });
}

export async function GET(req: Request) {
  return Response.json({ status: 200, body: "Hello World" });
}
