import { UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="">
      Streaming platform
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
