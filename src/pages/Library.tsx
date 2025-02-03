import { motion } from "framer-motion";

const Library = () => {
  return (
    <div className="space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold"
      >
        Your Library
      </motion.h1>

      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">
          The library feature is under development. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default Library;