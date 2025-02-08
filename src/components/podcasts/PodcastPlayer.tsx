
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface PodcastPlayerProps {
  currentPodcast: {
    title: string;
    author: string;
    image: string;
  };
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onTimeChange: (value: number[]) => void;
}

const PodcastPlayer = ({
  currentPodcast,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onTimeChange,
}: PodcastPlayerProps) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-lg">
      <div className="flex items-center gap-4">
        <img
          src={currentPodcast.image}
          alt={currentPodcast.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{currentPodcast.title}</h3>
          <p className="text-sm text-muted-foreground">{currentPodcast.author}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button onClick={onPlayPause} size="icon">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon">
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={onTimeChange}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;
