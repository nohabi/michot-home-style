import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link, Navigate } from "react-router-dom";
import {
  Package, ShoppingCart, Users, BarChart3, MessageSquare,
  Plus, Trash2, Edit, Eye, AlertTriangle, TrendingUp
} from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];
type Order = Database["public"]["Tables"]["orders"]["Row"];
type QuoteRequest = Database["public"]["Tables"]["quote_requests"]["Row"];

type Tab = "overview" | "products" | "orders" | "quotes" | "analytics";

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<Tab>("overview");

  if (authLoading) return <div className="section-padding text-center"><p>Loading...</p></div>;
  if (!user || !isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="font-heading text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="flex gap-2 mb-8 overflow-x-auto border-b border-border">
          {([
            { key: "overview", icon: BarChart3, label: "Overview" },
            { key: "products", icon: Package, label: "Products" },
            { key: "orders", icon: ShoppingCart, label: "Orders" },
            { key: "quotes", icon: MessageSquare, label: "Quotes" },
            { key: "analytics", icon: TrendingUp, label: "Analytics" },
          ] as const).map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                tab === item.key ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        {tab === "overview" && <OverviewTab />}
        {tab === "products" && <ProductsTab />}
        {tab === "orders" && <OrdersTab />}
        {tab === "quotes" && <QuotesTab />}
        {tab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
}

function OverviewTab() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, lowStock: 0, pendingQuotes: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [productsRes, ordersRes, lowStockRes, quotesRes] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("orders").select("total"),
      supabase.from("products").select("id", { count: "exact", head: true }).lt("stock_count", 5),
      supabase.from("quote_requests").select("id", { count: "exact", head: true }).eq("status", "pending"),
    ]);

    const revenue = (ordersRes.data || []).reduce((sum, o) => sum + Number(o.total), 0);
    setStats({
      products: productsRes.count || 0,
      orders: ordersRes.data?.length || 0,
      revenue,
      lowStock: lowStockRes.count || 0,
      pendingQuotes: quotesRes.count || 0,
    });
  };

  const cards = [
    { label: "Total Products", value: stats.products, icon: Package, color: "text-blue-500" },
    { label: "Total Orders", value: stats.orders, icon: ShoppingCart, color: "text-green-500" },
    { label: "Revenue", value: formatPrice(stats.revenue), icon: TrendingUp, color: "text-accent" },
    { label: "Low Stock Items", value: stats.lowStock, icon: AlertTriangle, color: "text-destructive" },
    { label: "Pending Quotes", value: stats.pendingQuotes, icon: MessageSquare, color: "text-yellow-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <c.icon className={`w-5 h-5 ${c.color}`} />
            <span className="text-sm text-muted-foreground">{c.label}</span>
          </div>
          <p className="text-2xl font-bold">{c.value}</p>
        </div>
      ))}
    </div>
  );
}

function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    toast.success("Product deleted");
    loadProducts();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-xl font-semibold">Products ({products.length})</h2>
        <Button onClick={() => setCreating(true)}><Plus className="w-4 h-4 mr-2" /> Add Product</Button>
      </div>

      {(creating || editing) && (
        <ProductForm
          product={editing}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSave={() => { setEditing(null); setCreating(false); loadProducts(); }}
        />
      )}

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-sm truncate">{p.name}</h3>
                {p.stock_count < 5 && (
                  <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded">Low Stock: {p.stock_count}</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{p.category} · {p.material} · {formatPrice(p.price)}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setEditing(p)}><Edit className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => deleteProduct(p.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductForm({ product, onClose, onSave }: { product: Product | null; onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState({
    name: product?.name || "",
    name_am: product?.name_am || "",
    description: product?.description || "",
    description_am: product?.description_am || "",
    price: product?.price || 0,
    original_price: product?.original_price || null,
    category: product?.category || "Sofas & Couches",
    material: product?.material || "Solid Wood",
    usage: product?.usage || ["Home"],
    stock_count: product?.stock_count || 0,
    featured: product?.featured || false,
    best_seller: product?.best_seller || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      in_stock: form.stock_count > 0,
      original_price: form.original_price || null,
    };

    if (product) {
      await supabase.from("products").update(data).eq("id", product.id);
      toast.success("Product updated");
    } else {
      await supabase.from("products").insert(data);
      toast.success("Product created");
    }
    onSave();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="font-heading text-lg font-semibold mb-4">{product ? "Edit Product" : "New Product"}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Name (English) *</label>
            <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Name (Amharic)</label>
            <Input value={form.name_am} onChange={(e) => setForm({ ...form, name_am: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Description (English) *</label>
          <Textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Description (Amharic)</label>
          <Textarea value={form.description_am} onChange={(e) => setForm({ ...form, description_am: e.target.value })} rows={3} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Price *</label>
            <Input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Original Price</label>
            <Input type="number" value={form.original_price || ""} onChange={(e) => setForm({ ...form, original_price: e.target.value ? Number(e.target.value) : null })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Stock *</label>
            <Input required type="number" value={form.stock_count} onChange={(e) => setForm({ ...form, stock_count: Number(e.target.value) })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Category *</label>
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Sofas & Couches", "Beds & Mattresses", "Dining Tables", "Chairs", "Office Furniture", "Decor & Accessories"].map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.best_seller} onChange={(e) => setForm({ ...form, best_seller: e.target.checked })} />
            Best Seller
          </label>
        </div>
        <div className="flex gap-2">
          <Button type="submit">{product ? "Update" : "Create"}</Button>
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => { loadOrders(); }, []);

  const loadOrders = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (data) setOrders(data);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status: status as any }).eq("id", id);
    toast.success(`Order updated to ${status}`);
    loadOrders();
  };

  const filtered = statusFilter ? orders.filter((o) => o.status === statusFilter) : orders;

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-xl font-semibold">Orders ({filtered.length})</h2>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="All Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
              <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((order) => (
          <div key={order.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-medium text-sm">#{order.id.slice(0, 8)} — {order.customer_name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {order.customer_phone} · {order.delivery_zone} · {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[order.status]}`}>
                  {order.status}
                </span>
                <span className="font-semibold text-sm">{formatPrice(order.total)}</span>
                <Select value={order.status} onValueChange={(v) => updateStatus(order.id, v)}>
                  <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                      <SelectItem key={s} value={s} className="capitalize text-xs">{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No orders found</p>}
      </div>
    </div>
  );
}

function QuotesTab() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);

  useEffect(() => { loadQuotes(); }, []);

  const loadQuotes = async () => {
    const { data } = await supabase.from("quote_requests").select("*").order("created_at", { ascending: false });
    if (data) setQuotes(data);
  };

  const updateQuote = async (id: string, status: string, response?: string, price?: number) => {
    const update: any = { status };
    if (response) update.admin_response = response;
    if (price) update.quoted_price = price;
    await supabase.from("quote_requests").update(update).eq("id", id);
    toast.success("Quote updated");
    loadQuotes();
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    reviewed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    quoted: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    accepted: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div>
      <h2 className="font-heading text-xl font-semibold mb-6">Quote Requests ({quotes.length})</h2>
      <div className="space-y-3">
        {quotes.map((q) => (
          <div key={q.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{q.business_name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[q.status]}`}>{q.status}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {q.contact_name} · {q.contact_phone} · {q.business_type}
                </p>
                <p className="text-sm mt-2">{q.description}</p>
                {q.admin_response && (
                  <p className="text-sm mt-2 text-accent">Response: {q.admin_response}</p>
                )}
              </div>
              <Select value={q.status} onValueChange={(v) => updateQuote(q.id, v)}>
                <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["pending", "reviewed", "quoted", "accepted", "rejected"].map((s) => (
                    <SelectItem key={s} value={s} className="capitalize text-xs">{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
        {quotes.length === 0 && <p className="text-center text-muted-foreground py-8">No quote requests yet</p>}
      </div>
    </div>
  );
}

function AnalyticsTab() {
  const [topViewed, setTopViewed] = useState<{ name: string; views: number }[]>([]);
  const [recentOrders, setRecentOrders] = useState<{ date: string; count: number; revenue: number }[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    // Top viewed products
    const { data: views } = await supabase
      .from("product_views")
      .select("product_id, products(name)")
      .order("viewed_at", { ascending: false })
      .limit(100);

    if (views) {
      const viewCounts: Record<string, { name: string; views: number }> = {};
      views.forEach((v: any) => {
        const name = v.products?.name || "Unknown";
        if (!viewCounts[v.product_id]) viewCounts[v.product_id] = { name, views: 0 };
        viewCounts[v.product_id].views++;
      });
      setTopViewed(Object.values(viewCounts).sort((a, b) => b.views - a.views).slice(0, 10));
    }

    // Orders by day
    const { data: orders } = await supabase
      .from("orders")
      .select("created_at, total")
      .order("created_at", { ascending: false })
      .limit(100);

    if (orders) {
      const byDate: Record<string, { count: number; revenue: number }> = {};
      orders.forEach((o) => {
        const date = new Date(o.created_at).toLocaleDateString();
        if (!byDate[date]) byDate[date] = { count: 0, revenue: 0 };
        byDate[date].count++;
        byDate[date].revenue += Number(o.total);
      });
      setRecentOrders(Object.entries(byDate).map(([date, data]) => ({ date, ...data })).slice(0, 7));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading text-lg font-semibold mb-4">Most Viewed Products</h3>
        {topViewed.length === 0 ? (
          <p className="text-muted-foreground text-sm">No views tracked yet</p>
        ) : (
          <div className="space-y-3">
            {topViewed.map((p, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span>{p.name}</span>
                <span className="text-muted-foreground">{p.views} views</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading text-lg font-semibold mb-4">Recent Order Trends</h3>
        {recentOrders.length === 0 ? (
          <p className="text-muted-foreground text-sm">No orders yet</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((d, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span>{d.date}</span>
                <span className="text-muted-foreground">{d.count} orders · {formatPrice(d.revenue)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
