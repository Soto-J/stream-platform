import { Suspense } from "react";
import { redirect } from "next/navigation";

import {
  SearchResults,
  SearchResultsSkeleton,
} from "./_components/search-results";

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
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults term={searchParams?.term} />
      </Suspense>
    </div>
  );
}
