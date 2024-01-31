import { Prisma } from "@prisma/client";
import { db } from "./db";

import { getSelf } from "./auth-service";

const followsUser = Prisma.validator<Prisma.FollowDefaultArgs>()({
  include: { following: true },
});
export type FollowsUser = Prisma.FollowGetPayload<typeof followsUser>;

export const getFollowedUsers = async () => {
  try {
    const self = await getSelf();

    if (!self) {
      throw new Error("Unauthorized");
    }

    const followedUsers = await db.follow.findMany({
      where: { followerId: self.id },
      include: { following: true },
    });

    return followedUsers;
  } catch (error) {
    return [];
  }
};

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found!");
    }

    if (otherUser.id === self?.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self?.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch (error) {
    return false;
  }
};

export const followUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (!self) {
      throw new Error("Unauthorized");
    }

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found!");
    }

    if (self?.id === otherUser.id) {
      throw new Error("You cannot follow yourself!");
    }

    const exisitingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    if (exisitingFollow) {
      throw new Error("You are already following this user!");
    }

    return await db.follow.create({
      data: {
        followerId: self.id,
        followingId: otherUser.id,
      },
      include: {
        following: true,
        follower: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const unFollowUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (!self) {
      throw new Error("Unauthorized");
    }

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found!");
    }

    if (self.id === otherUser.id) {
      throw new Error("You cannot unfollow yourself!");
    }

    const exisitingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    if (!exisitingFollow) {
      throw new Error("You are not following this user!");
    }

    const unfollowedUser = await db.follow.delete({
      where: { id: exisitingFollow.id },
      include: { follower: true, following: true },
    });

    return unfollowedUser;
  } catch (error) {
    throw error;
  }
};
