import { Maximize, Minimize } from "lucide-react";

import { Hint } from "@/components/hint";

type FullscreenControlProps = {
  isFullscreen: boolean;
  onToggle: () => void;
};
export const FullscreenControl = ({
  isFullscreen,
  onToggle,
}: FullscreenControlProps) => {
  const Icon = isFullscreen ? Minimize : Maximize;
  const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint asChild label={label}>
        <button
          onClick={onToggle}
          className="rounded-lg p-1.5 text-white hover:bg-white/10"
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  );
};
