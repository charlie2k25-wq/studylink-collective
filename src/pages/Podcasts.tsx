
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Search, Play, Pause, SkipBack, SkipForward, Volume2, ChevronRight, Heart, Share2, MessageSquare, BookmarkPlus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface Podcast {
  id: number;
  title: string;
  author: string;
  description: string;
  duration: string;
  image: string;
  audioUrl: string;
  rating: number;
}

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
  const [volume, setVolume] = useState(1);
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleWishlist = (podcast: Podcast) => {
    toast({
      title: "Added to Wishlist",
      description: `${podcast.title} has been added to your wishlist`
    });
  };

  return (
    <div className="space-y-6">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Search Bar and Categories */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search podcasts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-transparent"
          />
        </div>

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

      {/* Player Section */}
      <div className="bg-card rounded-lg p-4 shadow-lg">
        <div className="flex items-center gap-4">
          <img
            src={podcasts[0].image}
            alt={podcasts[0].title}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{podcasts[0].title}</h3>
            <p className="text-sm text-muted-foreground">{podcasts[0].author}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button onClick={handlePlayPause} size="icon">
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
            onValueChange={(value) => {
              if (audioRef.current) {
                audioRef.current.currentTime = value[0];
              }
            }}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {sections.map((section) => (
        <section key={section} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{section}</h2>
            <Button variant="ghost" className="flex items-center">
              See all <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {podcasts.map((podcast) => (
              <motion.div
                key={podcast.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <img
                      src={podcast.image}
                      alt={podcast.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-white"
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold truncate">{podcast.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{podcast.author}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{podcast.rating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleWishlist(podcast)}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Podcasts;
