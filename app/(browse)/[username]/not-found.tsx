import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 text-muted-foreground">
      <h1 className="text-4xl">404</h1>
      <p>We cannot find the user you are looking for.</p>
      <Button asChild variant="secondary">
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}
