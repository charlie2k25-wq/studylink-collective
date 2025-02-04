import { motion, AnimatePresence } from "framer-motion";
import { Play, Heart, Share2, Plus, Store, Podcast, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingDown(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const fabItems = [
    { icon: Store, label: "Add Store", action: () => console.log("Add Store clicked") },
    { icon: Podcast, label: "Add Podcast", action: () => console.log("Add Podcast clicked") },
    { icon: MessageSquare, label: "Create Poll", action: () => console.log("Create Poll clicked") },
    { icon: Plus, label: "Add Update", action: () => console.log("Add Update clicked") },
  ];

  return (
    <div className="space-y-8 relative min-h-screen pb-24">
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

      {/* Floating Action Button */}
      <AnimatePresence>
        {!isScrollingDown && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="relative">
              {/* FAB Items */}
              <AnimatePresence>
                {isFabOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute bottom-16 right-0 space-y-3"
                  >
                    {fabItems.map((item, index) => (
                      <motion.button
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => {
                          item.action();
                          setIsFabOpen(false);
                        }}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                      >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main FAB Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFabOpen(!isFabOpen)}
                className={`h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-transform ${
                  isFabOpen ? "rotate-45" : ""
                }`}
              >
                <Plus size={24} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;