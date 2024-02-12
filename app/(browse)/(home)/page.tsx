import { Suspense } from "react";
import { Result, ResultSkeleton } from "./_components/result";

export default function Home() {
  return (
    <div className="mx-auto h-full max-w-screen-2xl gap-y-4 p-8">
      <Suspense fallback={<ResultSkeleton />}>
        <Result />
      </Suspense>
    </div>
  );
}
