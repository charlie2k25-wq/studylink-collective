
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import PodcastCard from "./PodcastCard";
import type { Podcast } from "@/types/podcast";

interface PodcastSectionProps {
  title: string;
  podcasts: Podcast[];
  isPlaying: boolean;
  onPlayPause: () => void;
  onWishlist: (podcast: Podcast) => void;
}

const PodcastSection = ({
  title,
  podcasts,
  isPlaying,
  onPlayPause,
  onWishlist,
}: PodcastSectionProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Button variant="ghost" className="flex items-center">
          See all <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {podcasts.map((podcast) => (
          <PodcastCard
            key={podcast.id}
            podcast={podcast}
            isPlaying={isPlaying}
            onPlayPause={onPlayPause}
            onWishlist={onWishlist}
          />
        ))}
      </div>
    </section>
  );
};

export default PodcastSection;
