import { motion } from "framer-motion";
import Navigation from "./Navigation";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="lg:ml-64 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto pb-24 lg:pb-6"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;