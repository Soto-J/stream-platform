import { db } from "@/lib/db";

import { getSelf } from "./auth-service";

export const getRecommended = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  let userId;

  try {
    const self = await getSelf();
    userId = self?.id;
  } catch (error) {
    userId = null;
  }

  console.log("userId", userId);
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
          ],
        },
      })
    : await db.user.findMany({
        orderBy: { createdAt: "desc" },
      });

  return users;
};
