import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
  return await db.user.findUnique({
    where: { username },
    include: {
      stream: {
        select: { isLive: true },
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
