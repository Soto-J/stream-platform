import { getSearch } from "@/lib/search-service";

import { ResultCard, ResultCardSkeleton } from "./result-card";

import { Skeleton } from "@/components/ui/skeleton";

type ResultsProps = { term: string };

export const SearchResults = async ({ term }: ResultsProps) => {
  const streams = await getSearch(term);

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">
        Results for term &quot;{term}&quot;
      </h2>

      {streams.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No results found. Try searching for something else.
        </p>
      )}

      <div className="flex flex-col gap-y-4">
        {streams.map((stream) => (
          <ResultCard key={stream.id} stream={stream} />
        ))}
      </div>
    </div>
  );
};

export const SearchResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="mb-4 h-8 w-[290px]" />

      <div className="flex flex-col gap-y-4">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
