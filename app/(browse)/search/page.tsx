import { Suspense } from "react";
import { redirect } from "next/navigation";

import { Results, ResultsSkeleton } from "./_components/results";

type SearchPageProps = {
  searchParams: { term?: string };
};

export default function SearchPAge({ searchParams }: SearchPageProps) {
  if (!searchParams.term) {
    redirect("/");
  }

  return (
    <div className="mx-auto h-full max-w-screen-2xl p-8">
      SearchPAge
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams?.term} />
      </Suspense>
    </div>
  );
}
