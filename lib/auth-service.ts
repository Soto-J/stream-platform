import { db } from "@/lib/db";

import { currentUser } from "@clerk/nextjs";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = db.user.findUnique({
    where: { externalUserId: self.id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
