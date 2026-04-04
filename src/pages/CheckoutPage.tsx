import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const deliveryZones = [
  { name: "Tulu Dimtu (Local)", cost: 0, minOrder: 20000 },
  { name: "Tulu Dimtu (Local)", cost: 500, minOrder: 0 },
  { name: "Akaki Kality", cost: 800, minOrder: 0 },
  { name: "Bole", cost: 1200, minOrder: 0 },
  { name: "Kirkos / Lideta", cost: 1500, minOrder: 0 },
  { name: "Yeka / Gullele", cost: 1800, minOrder: 0 },
  { name: "Kolfe / Addis Ketema", cost: 1500, minOrder: 0 },
  { name: "Other Addis Ababa", cost: 2000, minOrder: 0 },
];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [zone, setZone] = useState("");
  const [ordered, setOrdered] = useState(false);

  const selectedZone = deliveryZones.find((z) => z.name === zone);
  const deliveryCost = selectedZone
    ? totalPrice >= selectedZone.minOrder && selectedZone.cost === 0
      ? 0
      : selectedZone.cost || 500
    : 0;
  const grandTotal = totalPrice + deliveryCost;

  const handleOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return;
    setOrdered(true);
    clearCart();
    toast.success("Order placed successfully!");
  };

  if (ordered) {
    return (
      <div className="section-padding text-center">
        <div className="container-custom max-w-md">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
          <h1 className="font-heading text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your order. We'll contact you to confirm delivery details.
          </p>
          <Button asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="section-padding text-center">
        <div className="container-custom">
          <h1 className="font-heading text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button asChild><Link to="/shop">Browse Products</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>

        <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h2 className="font-heading text-lg font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name *</label>
                    <Input required placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone *</label>
                    <Input required type="tel" placeholder="+251..." />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
              </div>

              <div>
                <h2 className="font-heading text-lg font-semibold mb-4">Delivery</h2>
                <div>
                  <label className="text-sm font-medium mb-2 block">Delivery Zone *</label>
                  <Select required value={zone} onValueChange={setZone}>
                    <SelectTrigger><SelectValue placeholder="Select your area" /></SelectTrigger>
                    <SelectContent>
                      {[...new Set(deliveryZones.map((z) => z.name))].map((name) => (
                        <SelectItem key={name} value={name}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">Delivery Address *</label>
                  <Input required placeholder="Street address or landmark" />
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">Notes</label>
                  <Input placeholder="Additional delivery instructions" />
                </div>
              </div>

              <div>
                <h2 className="font-heading text-lg font-semibold mb-4">Payment</h2>
                <p className="text-sm text-muted-foreground bg-muted rounded-md p-4">
                  💰 Payment is collected upon delivery (Cash on Delivery). Our team will contact you to confirm your order.
                </p>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="font-heading text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
                      <span>{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>{deliveryCost === 0 ? "Free" : formatPrice(deliveryCost)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-border pt-3 mt-3">
                    <span>Total</span>
                    <span className="text-accent">{formatPrice(grandTotal)}</span>
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full mt-6">Place Order</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
