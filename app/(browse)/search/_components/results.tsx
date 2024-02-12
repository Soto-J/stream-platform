import { Skeleton } from "@/components/ui/skeleton";

type ResultsProps = {
  term: string;
};

export const Results = ({ term }: ResultsProps) => {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">
        Results for term &quot;{term}&quot;
      </h2>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton />
    </div>
  );
};
