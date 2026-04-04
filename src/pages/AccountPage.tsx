import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useTranslation } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { formatPrice } from "@/lib/products";
import { Package, User, Heart } from "lucide-react";

interface Profile {
  display_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
}

interface Order {
  id: string;
  status: string;
  total: number;
  created_at: string;
}

export default function AccountPage() {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<"profile" | "orders" | "wishlist">("profile");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Profile>({ display_name: "", phone: "", address: "", city: "Addis Ababa" });

  useEffect(() => {
    if (!user) return;
    loadProfile();
    loadOrders();
  }, [user]);

  const loadProfile = async () => {
    const { data } = await supabase.from("profiles").select("*").eq("user_id", user!.id).single();
    if (data) {
      setProfile(data);
      setFormData({ display_name: data.display_name, phone: data.phone, address: data.address, city: data.city });
    }
  };

  const loadOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("id, status, total, created_at")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });
    if (data) setOrders(data);
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("profiles")
      .update(formData)
      .eq("user_id", user!.id);
    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated!");
      setEditing(false);
      loadProfile();
    }
  };

  if (!user) {
    return (
      <div className="section-padding text-center">
        <div className="container-custom">
          <p className="text-lg mb-4">{t("signIn")} to view your account</p>
          <Button asChild><Link to="/auth">{t("signIn")}</Link></Button>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <h1 className="font-heading text-3xl font-bold mb-8">{t("account")}</h1>

        <div className="flex gap-2 mb-8 border-b border-border">
          {[
            { key: "profile" as const, icon: User, label: t("profile") },
            { key: "orders" as const, icon: Package, label: t("orders") },
            { key: "wishlist" as const, icon: Heart, label: t("wishlist") },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === item.key ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        {tab === "profile" && (
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-xl font-semibold">{t("profile")}</h2>
              <div className="flex gap-2">
                {!editing && (
                  <Button variant="outline" size="sm" onClick={() => setEditing(true)}>Edit</Button>
                )}
                <Button variant="destructive" size="sm" onClick={signOut}>{t("logout")}</Button>
              </div>
            </div>
            {editing ? (
              <form onSubmit={saveProfile} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("displayName")}</label>
                  <Input value={formData.display_name || ""} onChange={(e) => setFormData({ ...formData, display_name: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("phone")}</label>
                  <Input value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("deliveryAddress")}</label>
                  <Input value={formData.address || ""} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Save</Button>
                  <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                </div>
              </form>
            ) : (
              <div className="space-y-3 text-sm">
                <div><span className="text-muted-foreground">Email:</span> <span className="ml-2">{user.email}</span></div>
                <div><span className="text-muted-foreground">Name:</span> <span className="ml-2">{profile?.display_name || "–"}</span></div>
                <div><span className="text-muted-foreground">Phone:</span> <span className="ml-2">{profile?.phone || "–"}</span></div>
                <div><span className="text-muted-foreground">Address:</span> <span className="ml-2">{profile?.address || "–"}</span></div>
                <div><span className="text-muted-foreground">City:</span> <span className="ml-2">{profile?.city || "–"}</span></div>
              </div>
            )}
          </div>
        )}

        {tab === "orders" && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No orders yet</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link to="/shop">{t("shopNow")}</Link>
                </Button>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-card border border-border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[order.status] || ""}`}>
                      {order.status}
                    </span>
                    <span className="text-sm font-semibold">{formatPrice(order.total)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "wishlist" && (
          <div className="text-center py-12 text-muted-foreground">
            <Heart className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Your wishlist is empty</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link to="/shop">{t("shopNow")}</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
