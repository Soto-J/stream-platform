import { getAllStreams } from "@/lib/stream-service";

import { ResultCard } from "./result-card";

export const Result = async () => {
  const data = await getAllStreams();
  
  return (
    <div className="">
      <h2 className="mb-4 text-lg font-semibold">
        Steams we think you&apos;ll like
      </h2>

      {data.length === 0 && (
        <p className="text-sm text-muted-foreground">No streams found.</p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data.map((stream) => (
          <ResultCard key={stream.id} stream={stream} />
        ))}
      </div>
    </div>
  );
};

export const ResultSkeleton = () => {
  return <div></div>;
};
