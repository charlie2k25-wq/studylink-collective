import { motion } from "framer-motion";
import { Play, Heart, Share2 } from "lucide-react";

interface Podcast {
  id: number;
  title: string;
  author: string;
  duration: string;
  image: string;
}

const FeaturedPodcasts = () => {
  const featuredPodcasts = [
    {
      id: 1,
      title: "The Future of Education",
      author: "Dr. Sarah Johnson",
      duration: "45:30",
      image: "https://picsum.photos/400/400",
    },
    {
      id: 2,
      title: "Learning in the Digital Age",
      author: "Tech Education Team",
      duration: "32:15",
      image: "https://picsum.photos/401/400",
    },
    {
      id: 3,
      title: "Student Success Stories",
      author: "Education Insights",
      duration: "28:45",
      image: "https://picsum.photos/402/400",
    },
  ];

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredPodcasts.map((podcast, index) => (
          <motion.div
            key={podcast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl overflow-hidden card-hover"
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
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{podcast.duration}</span>
                <div className="flex items-center space-x-4">
                  <button className="hover:text-primary transition-colors">
                    <Play size={20} />
                  </button>
                  <button className="hover:text-primary transition-colors">
                    <Heart size={20} />
                  </button>
                  <button className="hover:text-primary transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPodcasts;