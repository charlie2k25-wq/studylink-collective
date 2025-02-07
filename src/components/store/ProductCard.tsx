
import { Star, StarHalf, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/store";

interface ProductCardProps {
  product: Product;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  handlePurchase: (product: Product) => void;
}

export const ProductCard = ({
  product,
  wishlist,
  toggleWishlist,
  handlePurchase,
}: ProductCardProps) => {
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
    <div className="rounded-lg border bg-card shadow-sm">
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
          <Button onClick={() => handlePurchase(product)} className="w-full">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
