import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

import { getSelf } from "./auth-service";

const streamWithUser = Prisma.validator<Prisma.StreamDefaultArgs>()({
  select: {
    id: true,
    user: true,
    isLive: true,
    thumbnailUrl: true,
    name: true,
  },
});
export type StreamWithUser = Prisma.StreamGetPayload<typeof streamWithUser>;

export const getStreamByUserId = async (userId: string) => {
  return await db.stream.findFirst({
    where: { userId },
  });
};

export const getAllStreams = async () => {
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
        },
        select: {
          id: true,
          user: true,
          isLive: true,
          thumbnailUrl: true,
          name: true,
        },
        orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
      })
    : await db.stream.findMany({
        select: {
          id: true,
          user: true,
          isLive: true,
          thumbnailUrl: true,
          name: true,
        },
        orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
      });

  return streams;
};
