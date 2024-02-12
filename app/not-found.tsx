import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 text-muted-foreground">
      <h1 className="text-4xl">404</h1>
      <p>We couldn&apos;t find the page you are looking for.</p>
      <Button asChild variant="secondary">
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}
