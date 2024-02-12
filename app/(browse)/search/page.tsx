import { Suspense } from "react";
import { redirect } from "next/navigation";

import { SearchResults, ResultsSkeleton } from "./_components/search-results";

type SearchPageProps = {
  searchParams: { term?: string };
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams.term) {
    redirect("/");
  }

  return (
    <div className="mx-auto h-full max-w-screen-2xl p-8">
      Search Page
      <Suspense fallback={<ResultsSkeleton />}>
        <SearchResults term={searchParams?.term} />
      </Suspense>
    </div>
  );
}
