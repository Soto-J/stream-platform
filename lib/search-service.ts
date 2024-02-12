import { db } from "@/lib/db";

import { getSelf } from "./auth-service";

export const getSearch = async (term: string) => {
  let userId;

  try {
    const self = await getSelf();
    userId = self?.id;
  } catch (error) {
    userId = null;
  }

  const streams = userId
    ? await db.stream.findMany({
        where: {
          user: {
            NOT: {
              blocking: {
                some: { blockedId: userId },
              },
            },
          },
          OR: [
            {
              name: { contains: term },
            },
            {
              user: {
                username: { contains: term },
              },
            },
          ],
        },
        select: {
          id: true,
          user: true,
          isLive: true,
          thumbnailUrl: true,
          name: true,
          updatedAt: true,
        },
        orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
      })
    : await db.stream.findMany({
        where: {
          OR: [
            {
              name: { contains: term },
            },
            {
              user: {
                username: { contains: term },
              },
            },
          ],
        },
        select: {
          id: true,
          user: true,
          isLive: true,
          thumbnailUrl: true,
          name: true,
          updatedAt: true,
        },
        orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
      });

  return streams;
};
