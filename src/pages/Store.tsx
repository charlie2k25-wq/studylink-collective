
import { useState } from "react";
import { ShoppingCart, Search, Filter, Heart, Upload, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  type: "PDF" | "MP3" | "Software";
  imageUrl: string;
  rating: number;
  downloads: number;
  reviews: Review[];
  authorId: string;
  authorName: string;
  createdAt: string;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
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
    authorId: "auth1",
    authorName: "John Doe",
    createdAt: "2024-03-15",
    reviews: [
      {
        id: "rev1",
        userId: "user1",
        userName: "Alice Smith",
        rating: 4,
        comment: "Very informative guide!",
        createdAt: "2024-03-16",
      }
    ]
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
    authorId: "auth2",
    authorName: "Jane Smith",
    createdAt: "2024-03-14",
    reviews: [
      {
        id: "rev2",
        userId: "user2",
        userName: "Bob Johnson",
        rating: 5,
        comment: "Perfect for deep work sessions!",
        createdAt: "2024-03-15",
      }
    ]
  },
];

const Store = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [newProduct, setNewProduct] = useState<{
    title: string;
    description: string;
    price: number;
    type: "PDF" | "MP3" | "Software";
    imageUrl: string;
  }>({
    title: "",
    description: "",
    price: 0,
    type: "PDF",
    imageUrl: "",
  });

  const handlePurchase = (productId: string) => {
    toast.success("Purchase successful! Download starting...");
    // Simulate download start
    setTimeout(() => {
      toast.info("Download complete!");
    }, 2000);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    toast.success("Wishlist updated!");
  };

  const handleUpload = () => {
    // Validate form
    if (!newProduct.title || !newProduct.description || !newProduct.price) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Simulate upload
    toast.success("Product uploaded successfully!");
    setShowUploadDialog(false);
    setNewProduct({
      title: "",
      description: "",
      price: 0,
      type: "PDF",
      imageUrl: "",
    });
  };

  const handleReview = (productId: string, rating: number, comment: string) => {
    toast.success("Review submitted successfully!");
  };

  const filteredProducts = sampleProducts
    .filter(product =>
      (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedType === "all" || product.type === selectedType) &&
      product.price >= priceRange[0] && 
      product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popular":
          return b.downloads - a.downloads;
        default:
          return 0;
      }
    });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Digital Store</h1>
        <div className="flex gap-4">
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Digital Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Product Title"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                />
                <Input
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                />
                <Select
                  value={newProduct.type}
                  onValueChange={(value: "PDF" | "MP3" | "Software") => 
                    setNewProduct({...newProduct, type: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="MP3">MP3</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Image URL"
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                />
                <Button onClick={handleUpload} className="w-full">
                  Upload Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <ShoppingCart className="h-6 w-6" />
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="space-y-4">
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
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-4 items-center">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="PDF">PDF</SelectItem>
              <SelectItem value="MP3">MP3</SelectItem>
              <SelectItem value="Software">Software</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Price Range</span>
              <span>${priceRange[0]} - ${priceRange[1]}</span>
            </div>
            <Slider
              defaultValue={[0, 100]}
              max={100}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
          </div>
        </div>
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
                  <p className="text-sm text-muted-foreground mt-1">By {product.authorName}</p>
                </div>
                <span className="text-lg font-bold">${product.price}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{product.type}</span>
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span>({product.downloads} downloads)</span>
                </div>
              </div>
              <div className="space-y-2">
                {product.reviews.length > 0 && (
                  <div className="text-sm p-2 bg-muted rounded-lg">
                    <p className="font-medium">Latest Review:</p>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(product.reviews[0].rating)}
                    </div>
                    <p className="mt-1">{product.reviews[0].comment}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      - {product.reviews[0].userName}
                    </p>
                  </div>
                )}
                <Button onClick={() => handlePurchase(product.id)} className="w-full">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
