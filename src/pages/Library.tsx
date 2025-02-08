
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

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search for books & resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue={activeTab} className="mt-4">
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
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{section}</h2>
            <Button variant="ghost" className="flex items-center">
              See all <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sampleBooks.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="icon" variant="ghost" className="text-white">
                          <BookOpen className="h-5 w-5" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="text-white"
                          onClick={() => handleWishlist(book)}
                        >
                          <Bookmark className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold truncate">{book.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{book.author}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{book.rating}</span>
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
