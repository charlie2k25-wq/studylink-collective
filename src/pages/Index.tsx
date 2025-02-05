import { motion, AnimatePresence } from "framer-motion";
import { Play, Heart, Share2, Plus, Store, Podcast, MessageSquare, Image } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import StoryUpload from "@/components/StoryUpload";
import UpdateUpload from "@/components/UpdateUpload";
import PodcastUpload from "@/components/PodcastUpload";

const Index = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

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
      setIsScrollingDown(currentScrollY > 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const fabItems = [
    { 
      icon: Image, 
      label: "Add Story", 
      action: () => {
        setActiveDialog("story");
        setIsFabOpen(false);
      }
    },
    { 
      icon: MessageSquare, 
      label: "Add Update", 
      action: () => {
        setActiveDialog("update");
        setIsFabOpen(false);
      }
    },
    { 
      icon: Podcast, 
      label: "Add Podcast", 
      action: () => {
        setActiveDialog("podcast");
        setIsFabOpen(false);
      }
    },
    { 
      icon: Store, 
      label: "Add Store", 
      action: () => {
        setActiveDialog("store");
        setIsFabOpen(false);
      }
    },
  ];

  return (
    <div className="space-y-8 relative min-h-screen pb-16">
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

      {/* Floating Action Button */}
      <AnimatePresence>
        {!isScrollingDown && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 right-6 z-50"
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
                        onClick={item.action}
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

      {/* Upload Dialogs */}
      <Dialog open={activeDialog === "story"} onOpenChange={() => setActiveDialog(null)}>
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
            <h2 className="text-lg font-semibold">Create Story</h2>
            <StoryUpload />
          </div>
        </div>
      </Dialog>

      <Dialog open={activeDialog === "update"} onOpenChange={() => setActiveDialog(null)}>
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
            <h2 className="text-lg font-semibold">Create Update</h2>
            <UpdateUpload />
          </div>
        </div>
      </Dialog>

      <Dialog open={activeDialog === "podcast"} onOpenChange={() => setActiveDialog(null)}>
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
            <h2 className="text-lg font-semibold">Upload Podcast</h2>
            <PodcastUpload />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Index;
