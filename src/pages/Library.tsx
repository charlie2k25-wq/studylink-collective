
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronRight, Star, ThumbsUp, MessageSquare, Share2, Bookmark, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  category: string;
  likes: number;
  rating: number;
  format: "PDF" | "EPUB";
}

const sampleBooks: Book[] = [
  {
    id: "1",
    title: "The Art of Learning",
    author: "Josh Waitzkin",
    description: "An exploration of the learning process and personal growth.",
    coverUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Education",
    likes: 245,
    rating: 4.5,
    format: "PDF"
  },
  {
    id: "2",
    title: "Digital Minimalism",
    author: "Cal Newport",
    description: "A philosophy of technology use in a modern world.",
    coverUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Technology",
    likes: 189,
    rating: 4.8,
    format: "EPUB"
  }
];

const categories = ["For You", "Top Charts", "Categories", "Editor's Choice"];
const sections = ["Recommended for you", "New & Updated", "Popular Books", "Trending Now"];

const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("For You");
  const { toast } = useToast();

  const handleWishlist = (book: Book) => {
    toast({
      title: "Added to Wishlist",
      description: `${book.title} has been added to your wishlist`
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="space-y-4 pb-16 lg:pb-0">
      {/* Search Bar and Categories */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for books & resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveTab(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      {sections.map((section) => (
        <section key={section} className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-semibold md:text-xl">{section}</h2>
            <Button variant="ghost" className="flex items-center text-sm">
              See all <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 px-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {sampleBooks.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="group"
              >
                <Card className="h-full overflow-hidden">
                  <div className="relative aspect-[3/4]">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                      onClick={() => handleWishlist(book)}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="space-y-2 p-3">
                    <div>
                      <h3 className="line-clamp-1 font-medium">{book.title}</h3>
                      <p className="line-clamp-1 text-xs text-muted-foreground">
                        {book.author}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                        {book.format}
                      </span>
                      <div className="flex items-center gap-1">
                        {renderStars(book.rating)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Library;

