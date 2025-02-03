import { motion } from "framer-motion";
import { Search, Play, Pause, SkipBack, SkipForward, Volume2, Download, Heart, Share2, MessageSquare, BookmarkPlus } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

interface Podcast {
  id: number;
  title: string;
  author: string;
  description: string;
  duration: string;
  image: string;
  audioUrl: string;
}

const Podcasts = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const podcasts: Podcast[] = [
    {
      id: 1,
      title: "The Future of Education",
      author: "Dr. Sarah Johnson",
      description: "Exploring how technology is reshaping education globally",
      duration: "45:30",
      image: "https://picsum.photos/400/400",
      audioUrl: "https://example.com/audio1.mp3",
    },
    {
      id: 2,
      title: "Learning in the Digital Age",
      author: "Tech Education Team",
      description: "Understanding modern learning methodologies",
      duration: "32:15",
      image: "https://picsum.photos/401/400",
      audioUrl: "https://example.com/audio2.mp3",
    },
    {
      id: 3,
      title: "Student Success Stories",
      author: "Education Insights",
      description: "Real stories from successful students worldwide",
      duration: "28:45",
      image: "https://picsum.photos/402/400",
      audioUrl: "https://example.com/audio3.mp3",
    },
  ];

  const togglePlayPause = () => {
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

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = (podcast: Podcast) => {
    toast({
      title: "Download Started",
      description: `Downloading ${podcast.title}...`,
    });
  };

  const handleLike = (podcast: Podcast) => {
    toast({
      title: "Liked!",
      description: `You liked ${podcast.title}`,
    });
  };

  const handleBookmark = (podcast: Podcast) => {
    toast({
      title: "Bookmarked!",
      description: `${podcast.title} has been added to your library`,
    });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-lg p-4 flex items-center space-x-4"
      >
        <Search size={20} className="text-muted-foreground" />
        <input
          type="text"
          placeholder="Search podcasts..."
          className="bg-transparent border-none outline-none flex-1 placeholder:text-muted-foreground"
        />
      </motion.div>

      {/* Podcast Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-lg p-6 space-y-4"
      >
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={podcasts[0].image}
              alt={podcasts[0].title}
              className="w-16 h-16 rounded-lg"
            />
            <div>
              <h3 className="font-semibold">{podcasts[0].title}</h3>
              <p className="text-sm text-muted-foreground">{podcasts[0].author}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {[0.5, 1, 1.5, 2].map((rate) => (
              <Button
                key={rate}
                variant={playbackRate === rate ? "default" : "outline"}
                size="sm"
                onClick={() => handlePlaybackRateChange(rate)}
              >
                {rate}x
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            className="w-full"
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

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <SkipBack size={20} />
            </Button>
            <Button onClick={togglePlayPause} size="icon">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForward size={20} />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Volume2 size={20} className="text-muted-foreground" />
            <Slider
              value={[volume]}
              max={1}
              step={0.1}
              className="w-24"
              onValueChange={handleVolumeChange}
            />
          </div>
        </div>
      </motion.div>

      {/* Podcast List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcasts.map((podcast, index) => (
          <motion.div
            key={podcast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl overflow-hidden"
          >
            <img
              src={podcast.image}
              alt={podcast.title}
              className="w-full aspect-square object-cover"
            />
            <div className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{podcast.title}</h3>
                <p className="text-sm text-muted-foreground">{podcast.author}</p>
                <p className="text-sm mt-2">{podcast.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{podcast.duration}</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownload(podcast)}
                  >
                    <Download size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleLike(podcast)}
                  >
                    <Heart size={18} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 size={18} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageSquare size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleBookmark(podcast)}
                  >
                    <BookmarkPlus size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Podcasts;