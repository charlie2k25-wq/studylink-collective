import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SearchAndFilters } from "@/components/store/SearchAndFilters";
import { ProductUploadDialog } from "@/components/store/ProductUploadDialog";
import { CartDialog } from "@/components/store/CartDialog";
import { ProductCard } from "@/components/store/ProductCard";
import { Product, CartItem } from "@/types/store";
import { useNavigate } from "react-router-dom";

const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Digital Marketing Guide",
    description: "Comprehensive guide for modern marketing strategies",
    price: 29.99,
    currency: "USD",
    type: "PDF",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    mediaUrl: "https://example.com/marketing-guide.pdf",
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
    currency: "USD",
    type: "MP3",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    mediaUrl: "https://example.com/music-pack.mp3",
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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const handlePurchase = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success("Added to cart!");
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.success("Removed from cart!");
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    toast.success("Wishlist updated!");
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Digital Store</h1>
        <div className="flex gap-4">
          <ProductUploadDialog
            showUploadDialog={showUploadDialog}
            setShowUploadDialog={setShowUploadDialog}
          />
          <Button
            variant="outline"
            onClick={() => setShowCart(true)}
            className="relative"
          >
            <ShoppingCart className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Button>
        </div>
      </div>

      <CartDialog
        showCart={showCart}
        setShowCart={setShowCart}
        cart={cart}
        removeFromCart={removeFromCart}
      />

      <SearchAndFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            handlePurchase={handlePurchase}
          />
        ))}
      </div>
    </div>
  );
};

export default Store;
