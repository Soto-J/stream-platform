import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

import { getSelf } from "@/lib/auth-service";

const blockedUser = Prisma.validator<Prisma.BlockDefaultArgs>()({
  include: { blocked: true, blocker: true },
});
export type BlockedUser = Prisma.BlockGetPayload<typeof blockedUser>;

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (!self) {
      throw new Error("Unauthorized");
    }

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found!");
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const isBlocked = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockedId: self.id,
          blockerId: otherUser.id,
        },
      },
    });

    return !!isBlocked;
  } catch (error) {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (!self) {
    throw new Error("Unauthorized");
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not found!");
  }

  if (otherUser.id === self.id) {
    throw new Error("You cannot block yourself!");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockedId: self.id,
        blockerId: otherUser.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error("Already blocked!");
  }

  return db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocker: true,
      blocked: true,
    },
  });
};

export const unBlockUser = async (id: string) => {
  const self = await getSelf();

  if (!self) {
    throw new Error("Unauthorized");
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not found!");
  }

  if (otherUser.id === self.id) {
    throw new Error("You cannot unblock yourself!");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockedId: self.id,
        blockerId: otherUser.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error("You are not blocking this user!");
  }

  return db.block.delete({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
    include: {
      blocker: true,
      blocked: true,
    },
  });
};
