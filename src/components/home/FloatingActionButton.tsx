import { motion, AnimatePresence } from "framer-motion";
import { Plus, Image, MessageSquare, Podcast, BarChart2 } from "lucide-react";

interface FloatingActionButtonProps {
  isScrollingDown: boolean;
  isFabOpen: boolean;
  setIsFabOpen: (value: boolean) => void;
  onItemClick: (dialog: string) => void;
}

const FloatingActionButton = ({
  isScrollingDown,
  isFabOpen,
  setIsFabOpen,
  onItemClick,
}: FloatingActionButtonProps) => {
  const fabItems = [
    { 
      icon: Image, 
      label: "Add Story", 
      action: () => {
        onItemClick("story");
        setIsFabOpen(false);
      }
    },
    { 
      icon: MessageSquare, 
      label: "Add Update", 
      action: () => {
        onItemClick("update");
        setIsFabOpen(false);
      }
    },
    { 
      icon: Podcast, 
      label: "Add Podcast", 
      action: () => {
        onItemClick("podcast");
        setIsFabOpen(false);
      }
    },
    { 
      icon: BarChart2, 
      label: "Add Poll", 
      action: () => {
        onItemClick("poll");
        setIsFabOpen(false);
      }
    },
  ];

  return (
    <AnimatePresence>
      {!isScrollingDown && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-20 right-6 z-50"
        >
          <div className="relative">
            <AnimatePresence>
              {isFabOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute bottom-16 right-0 space-y-2"
                >
                  {fabItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={item.action}
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-full shadow-lg hover:bg-primary/90 transition-colors text-sm"
                    >
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFabOpen(!isFabOpen)}
              className={`h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-transform ${
                isFabOpen ? "rotate-45" : ""
              }`}
            >
              <Plus size={24} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActionButton;