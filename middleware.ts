import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/:username",
    "/api/webhooks(.*)*",
    "/api/uploadthing(.*)*",
  ],
});

export const config = {
  matcher:  '/((?!_next/image|_next/static|favicon.ico).*)',
  // matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
