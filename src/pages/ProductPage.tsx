import { useParams, Link } from "react-router-dom";
import { useProduct, useProducts, formatPrice } from "@/hooks/use-products";
import { useCart } from "@/lib/cart";
import { useTranslation } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { useWishlist } from "@/hooks/use-wishlist";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/ProductCard";
import { ShoppingCart, Star, Minus, Plus, ArrowLeft, Truck, Shield, Package, Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProductPage() {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id || "");
  const { data: allProducts } = useProducts();
  const { addItem } = useCart();
  const { t, language } = useTranslation();
  const { user } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  // Track product view
  useEffect(() => {
    if (id) {
      supabase.from("product_views").insert({
        product_id: id,
        user_id: user?.id || null,
      }).then(() => {});
    }
  }, [id, user?.id]);

  if (isLoading) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section-padding text-center">
        <div className="container-custom">
          <h1 className="font-heading text-2xl font-bold mb-4">{t("productNotFound")}</h1>
          <Button asChild><Link to="/shop">{t("backToShop")}</Link></Button>
        </div>
      </div>
    );
  }

  const name = language === "am" && product.name_am ? product.name_am : product.name;
  const description = language === "am" && product.description_am ? product.description_am : product.description;

  const related = (allProducts || [])
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const cartProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    originalPrice: product.original_price ?? undefined,
    category: product.category,
    material: product.material,
    usage: product.usage,
    images: product.images,
    inStock: product.in_stock,
    stockCount: product.stock_count,
    rating: product.rating,
    reviewCount: product.review_count,
    featured: product.featured,
    bestSeller: product.best_seller,
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t("backToShop")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center">
            {product.images.length > 0 ? (
              <img src={product.images[0]} alt={name} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <span className="text-muted-foreground font-heading text-2xl">{product.category}</span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.review_count} {t("reviews")})</span>
              {product.best_seller && (
                <span className="bg-accent/10 text-accent text-xs font-semibold px-2 py-0.5 rounded">{t("bestSeller")}</span>
              )}
            </div>

            <h1 className="font-heading text-3xl font-bold mb-2">{name}</h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
              {product.original_price && (
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.original_price)}</span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="bg-muted rounded-md p-3">
                <span className="text-muted-foreground">{t("category")}</span>
                <p className="font-medium">{product.category}</p>
              </div>
              <div className="bg-muted rounded-md p-3">
                <span className="text-muted-foreground">{t("material")}</span>
                <p className="font-medium">{product.material}</p>
              </div>
              <div className="bg-muted rounded-md p-3">
                <span className="text-muted-foreground">{t("usage")}</span>
                <p className="font-medium">{product.usage.join(", ")}</p>
              </div>
              <div className="bg-muted rounded-md p-3">
                <span className="text-muted-foreground">{t("availability")}</span>
                <p className={`font-medium ${product.in_stock ? "text-green-600" : "text-destructive"}`}>
                  {product.in_stock ? `${t("inStock")} (${product.stock_count})` : t("outOfStock")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-md">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button className="flex-1" size="lg" onClick={() => addItem(cartProduct, quantity)} disabled={!product.in_stock}>
                <ShoppingCart className="w-4 h-4 mr-2" /> {t("addToCart")}
              </Button>
              {user && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-destructive text-destructive" : ""}`} />
                </Button>
              )}
            </div>

            <div className="space-y-3 border-t border-border pt-6">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-4 h-4 text-accent" />
                <span>{t("freeDeliveryWithin")}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-4 h-4 text-accent" />
                <span>{t("twoYearGuarantee")}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Package className="w-4 h-4 text-accent" />
                <span>{t("deliveryAcrossAddis")}</span>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-heading text-2xl font-bold mb-8">{t("youMayAlsoLike")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
