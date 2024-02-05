import { Volume1, Volume2, VolumeX } from "lucide-react";

import { Hint } from "@/components/hint";
import { Slider } from "@/components/ui/slider";

type VolumeControlProps = {
  onToggle: () => void;
  onChange: (volume: number) => void;
  volume: number;
};

export const VolumeControl = ({
  onToggle,
  onChange,
  volume,
}: VolumeControlProps) => {
  const isMuted = volume === 0;
  const isAboutHalf = volume > 50;

  let Icon = Volume1;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboutHalf) {
    Icon = Volume2;
  }

  const label = isMuted ? "Unmute" : "Mute";

  const handleChange = (value: number[]) => {
    onChange(value[0]);
  };

  return (
    <div className="flex items-center gap-2">
      <Hint asChild label={label}>
        <button
          onClick={onToggle}
          className="rounded-lg p-1.5 text-white hover:bg-white/10"
        >
          <Icon className="h-6 w-6" />
        </button>
      </Hint>

      <Slider
        onValueChange={handleChange}
        value={[volume]}
        max={100}
        min={0}
        step={1}
        className="w-[8rem] cursor-pointer"
      />
    </div>
  );
};
