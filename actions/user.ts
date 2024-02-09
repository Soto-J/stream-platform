"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { User } from "@prisma/client";

import { getSelf } from "@/lib/auth-service";

export const updateUser = async (values: Partial<User>) => {
  try {
    const self = await getSelf();

    if (!self) {
      throw new Error("Unauthorized");
    }

    const user = db.user.update({
      where: { id: self.id },
      data: { ...values },
    });

    revalidatePath(`/${self.username}`);
    revalidatePath(`/u/${self.username}`);

    return user;
  } catch (error) {
    throw error;
  }
};
