"use server";

import { revalidatePath } from "next/cache";

import { blockUser, unBlockUser } from "@/lib/block-service";

export const onBlockUser = async (id: string) => {
  try {
    const blockedUser = await blockUser(id);

    revalidatePath("/");

    if (blockedUser) {
      revalidatePath(`/${blockedUser.blocked.username}`);
    }

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
