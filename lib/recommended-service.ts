import { db } from "@/lib/db";

import { getSelf } from "./auth-service";
import { Prisma } from "@prisma/client";

const userWithStream = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { stream: true },
});
export type UserWithStream = Prisma.UserGetPayload<typeof userWithStream>;

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
        include: { stream: true },
      })
    : await db.user.findMany({
        orderBy: { createdAt: "desc" },
        include: { stream: true },
      });

  return users;
};
