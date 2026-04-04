import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { useTranslation } from "@/lib/i18n";
import { formatPrice } from "@/hooks/use-products";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const deliveryZones = [
  { name: "Tulu Dimtu (Local)", cost: 0, minOrder: 20000 },
  { name: "Tulu Dimtu (Local - Standard)", cost: 500, minOrder: 0 },
  { name: "Akaki Kality", cost: 800, minOrder: 0 },
  { name: "Bole", cost: 1200, minOrder: 0 },
  { name: "Kirkos / Lideta", cost: 1500, minOrder: 0 },
  { name: "Yeka / Gullele", cost: 1800, minOrder: 0 },
  { name: "Kolfe / Addis Ketema", cost: 1500, minOrder: 0 },
  { name: "Other Addis Ababa", cost: 2000, minOrder: 0 },
];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [zone, setZone] = useState("");
  const [ordered, setOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const selectedZone = deliveryZones.find((z) => z.name === zone);
  const deliveryCost = selectedZone
    ? totalPrice >= selectedZone.minOrder && selectedZone.cost === 0
      ? 0
      : selectedZone.cost || 500
    : 0;
  const grandTotal = totalPrice + deliveryCost;

  const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0 || !zone) return;
    setLoading(true);

    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user?.id || null,
          delivery_zone: zone,
          delivery_address: formData.address,
          delivery_cost: deliveryCost,
          subtotal: totalPrice,
          total: grandTotal,
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_email: formData.email || null,
          notes: formData.notes || null,
        })
        .select("id")
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setOrdered(true);
      clearCart();
      toast.success(t("orderConfirmed"));
    } catch (error) {
      console.error("Order failed:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (ordered) {
    return (
      <div className="section-padding text-center">
        <div className="container-custom max-w-md">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
          <h1 className="font-heading text-3xl font-bold mb-4">{t("orderConfirmed")}</h1>
          <p className="text-muted-foreground mb-8">{t("orderConfirmedDesc")}</p>
          <Button asChild>
            <Link to="/shop">{t("continueShopping")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="section-padding text-center">
        <div className="container-custom">
          <h1 className="font-heading text-2xl font-bold mb-4">{t("yourCartEmpty")}</h1>
          <Button asChild><Link to="/shop">{t("browseProducts")}</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> {t("continueShopping")}
        </Link>

        <h1 className="font-heading text-3xl font-bold mb-8">{t("checkout")}</h1>

        <form onSubmit={handleOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h2 className="font-heading text-lg font-semibold mb-4">{t("contactInformation")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("fullName")} *</label>
                    <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={t("fullName")} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("phone")} *</label>
                    <Input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+251..." />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">{t("email")}</label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={t("yourEmail")} />
                </div>
              </div>

              <div>
                <h2 className="font-heading text-lg font-semibold mb-4">{t("delivery")}</h2>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("deliveryZone")} *</label>
                  <Select required value={zone} onValueChange={setZone}>
                    <SelectTrigger><SelectValue placeholder={t("selectArea")} /></SelectTrigger>
                    <SelectContent>
                      {deliveryZones.map((z) => (
                        <SelectItem key={z.name} value={z.name}>{z.name} — {z.cost === 0 && z.minOrder > 0 ? t("free") + ` (over ${formatPrice(z.minOrder)})` : formatPrice(z.cost)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">{t("deliveryAddress")} *</label>
                  <Input required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder={t("streetAddress")} />
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">{t("notes")}</label>
                  <Input value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder={t("additionalInstructions")} />
                </div>
              </div>

              <div>
                <h2 className="font-heading text-lg font-semibold mb-4">{t("payment")}</h2>
                <p className="text-sm text-muted-foreground bg-muted rounded-md p-4">{t("paymentNote")}</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="font-heading text-lg font-semibold mb-4">{t("orderSummary")}</h2>
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
                    <span className="text-muted-foreground">{t("subtotal")}</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("delivery")}</span>
                    <span>{deliveryCost === 0 ? t("free") : formatPrice(deliveryCost)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-border pt-3 mt-3">
                    <span>{t("total")}</span>
                    <span className="text-accent">{formatPrice(grandTotal)}</span>
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full mt-6" disabled={loading}>
                  {loading ? "..." : t("placeOrder")}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
