import { redirect } from "next/navigation";
import { getSelfByUsername } from "@/lib/auth-service";

import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

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
      <div className="flex h-full pt-20">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
