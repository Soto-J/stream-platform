import { db } from "@/lib/db";

import { getSelf } from "./auth-service";
import { Prisma } from "@prisma/client";

const userWithIsLive = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    stream: {
      select: { isLive: true },
    },
  },
});
export type UserWithIsLive = Prisma.UserGetPayload<typeof userWithIsLive>;

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self?.id;
  } catch (error) {
    userId = null;
  }

  const users = userId
    ? await db.user.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          AND: [
            {
              NOT: { id: userId },
            },
            {
              NOT: {
                following: {
                  some: { followerId: userId },
                },
              },
            },
            {
              NOT: {
                blocking: {
                  some: { blockedId: userId },
                },
              },
            },
          ],
        },
        include: {
          stream: {
            select: { isLive: true },
          },
        },
      })
    : await db.user.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          stream: {
            select: { isLive: true },
          },
        },
      });

  return users;
};
