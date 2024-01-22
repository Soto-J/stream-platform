import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clapperboard } from "lucide-react";

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div
      className="
        ml-4
        flex
        items-center
        justify-end
        gap-x-2
        lg:ml-0 
      "
    >
      {!user && (
        <SignInButton>
          <Button size="sm" variant="primary">
            Log in
          </Button>
        </SignInButton>
      )}

      {!!user && (
        <div className="flex items-center gap-x-2">
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className="h-5 w-5 cursor-pointer lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>

          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
};
