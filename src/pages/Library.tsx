import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Upload, BookOpen, Star, ThumbsUp, MessageSquare, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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

const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredBooks = sampleBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(sampleBooks.map(book => book.category)));

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold">Library</h1>
        <Button>
          <Upload className="mr-2" />
          Upload Book
        </Button>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search books by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="aspect-[3/4] relative mb-4 rounded-lg overflow-hidden">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardTitle>{book.title}</CardTitle>
                <CardDescription>by {book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{book.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{book.format}</span>
                  <Star className="h-4 w-4 ml-2" />
                  <span>{book.rating}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Library;