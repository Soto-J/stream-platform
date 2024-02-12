import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

const userWithStream = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    username: true,
    bio: true,
    imageUrl: true,
    stream: {
      select: {
        id: true,
        isLive: true,
        isChatDelayed: true,
        isChatEnabled: true,
        isChatFollowersOnly: true,
        thumbnailUrl: true,
        name: true,
      },
    },
    _count: {
      select: { followedBy: true },
    },
  },
});
export type UserWithStream = Prisma.UserGetPayload<typeof userWithStream>;

const customStream = Prisma.validator<Prisma.StreamDefaultArgs>()({
  select: {
    id: true,
    isLive: true,
    isChatDelayed: true,
    isChatEnabled: true,
    isChatFollowersOnly: true,
    thumbnailUrl: true,
    name: true,
  },
});
export type CustomStream = Prisma.StreamGetPayload<typeof customStream>;

export const getUserByUsername = async (username: string) => {
  return await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      bio: true,
      imageUrl: true,
      stream: {
        select: {
          id: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name: true,
        },
      },
      _count: {
        select: { followedBy: true },
      },
    },
  });
};

export const getUserById = async (id: string) => {
  return await db.user.findUnique({
    where: { id },
    include: {
      stream: {
        select: { isLive: true },
      },
    },
  });
};
