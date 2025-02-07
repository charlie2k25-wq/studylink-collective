
import { useState } from "react";
import { ShoppingCart, Search, Filter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  type: "PDF" | "MP3" | "Software";
  imageUrl: string;
  rating: number;
  downloads: number;
}

const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Digital Marketing Guide",
    description: "Comprehensive guide for modern marketing strategies",
    price: 29.99,
    type: "PDF",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    rating: 4.5,
    downloads: 120,
  },
  {
    id: "2",
    title: "Productivity Music Pack",
    description: "Focus-enhancing background music collection",
    price: 19.99,
    type: "MP3",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    rating: 4.8,
    downloads: 250,
  },
];

const Store = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);

  const handlePurchase = () => {
    toast.info("Coming soon! Our store is under construction.");
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    toast.success("Wishlist updated!");
  };

  const filteredProducts = sampleProducts.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Digital Store</h1>
        <ShoppingCart className="h-6 w-6" />
      </div>
      
      {/* Search and Filter Section */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="rounded-lg border bg-card shadow-sm">
            <div className="relative aspect-video">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="rounded-t-lg object-cover w-full h-full"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart
                  className={`h-5 w-5 ${
                    wishlist.includes(product.id) ? "fill-current text-red-500" : ""
                  }`}
                />
              </Button>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
                <span className="text-lg font-bold">${product.price}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{product.type}</span>
                <span>⭐ {product.rating} ({product.downloads} downloads)</span>
              </div>
              <Button onClick={handlePurchase} className="w-full">
                Buy Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
