import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Store = () => {
  const handlePurchase = () => {
    toast.info("Coming soon! Our store is under construction.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Store</h1>
        <ShoppingCart className="h-6 w-6" />
      </div>
      
      <div className="grid gap-4">
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Premium Subscription</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Get unlimited access to all educational content
          </p>
          <Button onClick={handlePurchase} className="mt-4">
            Subscribe
          </Button>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Study Materials</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Purchase additional study resources
          </p>
          <Button onClick={handlePurchase} variant="outline" className="mt-4">
            Browse Materials
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Store;