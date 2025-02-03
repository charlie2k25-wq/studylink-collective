import { motion } from "framer-motion";
import { Play, Heart, Share2 } from "lucide-react";

const Index = () => {
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
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold"
        >
          Welcome to EduPod
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-2xl mx-auto"
        >
          Discover educational podcasts, join discussions, and enhance your learning journey.
        </motion.p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Featured Podcasts</h2>
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
    </div>
  );
};

export default Index;