import Link from "next/link";

import { UserButton } from "@clerk/nextjs";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Actions = async () => {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button
        asChild
        size="sm"
        variant="ghost"
        className="text-muted-foreground hover:text-primary"
      >
        <Link href="/">
          <LogOut className="mr-2 h-5 w-5" />
          Exit
        </Link>
      </Button>

      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
