
import { ShoppingCart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { CartItem } from "@/types/store";

interface CartDialogProps {
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  cart: CartItem[];
  removeFromCart: (productId: string) => void;
}

export const CartDialog = ({
  showCart,
  setShowCart,
  cart,
  removeFromCart,
}: CartDialogProps) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart } });
  };

  return (
    <Dialog open={showCart} onOpenChange={setShowCart}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Shopping Cart</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <img src={item.imageUrl} alt={item.title} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">${item.price}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <p className="text-lg font-medium">Total:</p>
                  <p className="text-sm text-muted-foreground">
                    ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                  </p>
                </div>
                <Button onClick={handleCheckout}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
