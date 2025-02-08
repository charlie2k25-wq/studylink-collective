
import { motion } from "framer-motion";
import { Play, Pause, Heart, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Podcast } from "@/types/podcast";

interface PodcastCardProps {
  podcast: Podcast;
  isPlaying: boolean;
  onPlayPause: () => void;
  onWishlist: (podcast: Podcast) => void;
}

const PodcastCard = ({ podcast, isPlaying, onPlayPause, onWishlist }: PodcastCardProps) => {
  return (
    <motion.div
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
              onClick={onPlayPause}
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
                onClick={() => onWishlist(podcast)}
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
  );
};

export default PodcastCard;
