import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { getProductImage } from "@/lib/product-images";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-heading">Shopping Cart ({totalItems})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingBag className="w-16 h-16 opacity-30" />
            <p>Your cart is empty</p>
            <Button variant="default" onClick={() => setIsOpen(false)} asChild>
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3 bg-muted rounded-lg">
                  <div className="w-20 h-20 bg-secondary rounded-md flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
                    <p className="text-sm text-accent font-semibold mt-1">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto text-destructive" onClick={() => removeItem(item.product.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-accent">{formatPrice(totalPrice)}</span>
              </div>
              <Button className="w-full" size="lg" asChild onClick={() => setIsOpen(false)}>
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
