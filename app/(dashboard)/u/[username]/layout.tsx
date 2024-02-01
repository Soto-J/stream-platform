import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";

type CreatorLayoutProps = {
  children: React.ReactNode;
  params: {
    username: string;
  };
};

export default async function CreatorLayout({
  children,
  params,
}: CreatorLayoutProps) {
  const self = await getSelfByUsername(params.username);

  if (!self) {
    return redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">{children}</div>
    </>
  );
}
