"use server";

import { revalidatePath } from "next/cache";

import { RoomServiceClient } from "livekit-server-sdk";

import { getSelf } from "@/lib/auth-service";

import { blockUser, unBlockUser } from "@/lib/block-service";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

export const onBlockUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (!self) {
      throw new Error("Unauthorized");
    }

    let blockedUser;

    try {
      blockedUser = await blockUser(id);
    } catch (error) {
      // If user is a guest, blockUser will throw an error
    }

    try {
      await roomService.removeParticipant(self.id, id);
    } catch (error) {
      // If user is not in the room, removeParticipant will throw an error
    }

    revalidatePath(`/u/${self.username}/community`);

    return blockedUser;
  } catch (error) {
    throw error;
  }
};

export const onUnBlockUser = async (id: string) => {
  try {
    const unBlockedUser = await unBlockUser(id);

    revalidatePath("/");

    if (unBlockedUser) {
      revalidatePath(`/${unBlockedUser.blocked.username}`);
    }

    return unBlockedUser;
  } catch (error) {
    throw error;
  }
};
