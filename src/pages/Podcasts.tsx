
import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PodcastSearch from "@/components/podcasts/PodcastSearch";
import PodcastPlayer from "@/components/podcasts/PodcastPlayer";
import PodcastSection from "@/components/podcasts/PodcastSection";
import type { Podcast } from "@/types/podcast";

const podcasts: Podcast[] = [
  {
    id: 1,
    title: "The Future of Education",
    author: "Dr. Sarah Johnson",
    description: "Exploring how technology is reshaping education globally",
    duration: "45:30",
    image: "https://picsum.photos/400/400",
    audioUrl: "https://example.com/audio1.mp3",
    rating: 4.8
  },
  {
    id: 2,
    title: "Learning in the Digital Age",
    author: "Tech Education Team",
    description: "Understanding modern learning methodologies",
    duration: "32:15",
    image: "https://picsum.photos/401/400",
    audioUrl: "https://example.com/audio2.mp3",
    rating: 4.5
  },
  {
    id: 3,
    title: "Student Success Stories",
    author: "Education Insights",
    description: "Real stories from successful students worldwide",
    duration: "28:45",
    image: "https://picsum.photos/402/400",
    audioUrl: "https://example.com/audio3.mp3",
    rating: 4.7
  }
];

const categories = ["For You", "Top Charts", "Categories", "Editor's Choice"];
const sections = ["Trending Podcasts", "New Releases", "Popular Series", "Recently Played"];

const Podcasts = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("For You");
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleWishlist = (podcast: Podcast) => {
    toast({
      title: "Added to Wishlist",
      description: `${podcast.title} has been added to your wishlist`
    });
  };

  return (
    <div className="space-y-6">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-4">
        <PodcastSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <Tabs defaultValue={activeTab} className="mt-4">
          <TabsList className="w-full justify-start overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveTab(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <PodcastPlayer
        currentPodcast={podcasts[0]}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={handlePlayPause}
        onTimeChange={(value) => {
          if (audioRef.current) {
            audioRef.current.currentTime = value[0];
          }
        }}
      />

      {sections.map((section) => (
        <PodcastSection
          key={section}
          title={section}
          podcasts={podcasts}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onWishlist={handleWishlist}
        />
      ))}
    </div>
  );
};

export default Podcasts;
