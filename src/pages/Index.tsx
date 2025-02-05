import { useState, useEffect } from "react";
import FeaturedPodcasts from "@/components/home/FeaturedPodcasts";
import FloatingActionButton from "@/components/home/FloatingActionButton";
import UploadDialogs from "@/components/home/UploadDialogs";

const Index = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingDown(currentScrollY > 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="space-y-8 relative min-h-screen pb-16">
      <FeaturedPodcasts />
      
      <FloatingActionButton
        isScrollingDown={isScrollingDown}
        isFabOpen={isFabOpen}
        setIsFabOpen={setIsFabOpen}
        onItemClick={setActiveDialog}
      />

      <UploadDialogs
        activeDialog={activeDialog}
        onClose={() => setActiveDialog(null)}
      />
    </div>
  );
};

export default Index;