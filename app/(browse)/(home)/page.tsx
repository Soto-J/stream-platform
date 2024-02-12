import { Suspense } from "react";
import { Results, ResultsSkeleton } from "./_components/results";

export default function Home() {
  return (
    <div className="mx-auto h-full max-w-screen-2xl gap-y-4 p-8">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
