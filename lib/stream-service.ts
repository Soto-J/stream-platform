import { db } from "@/lib/db";

export const getStreamByUserId = async (userId: string) => {
  return await db.stream.findFirst({
    where: { userId },
  });
};
