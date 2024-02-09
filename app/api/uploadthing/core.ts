import { db } from "@/lib/db";

import { getSelf } from "@/lib/auth-service";

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const self = await getSelf();

      if (!self) {
        throw new UploadThingError("Unauthorized");
      }

      return { user: self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.stream.update({
        where: { userId: metadata.user.id },
        data: { thumbnailUrl: file.url },
      });

      console.log("thumbnail uploaded", file.url);
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
