import { motion } from "framer-motion";
import { Search } from "lucide-react";

const Podcasts = () => {
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

      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">
          The podcasts feature is under development. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default Podcasts;