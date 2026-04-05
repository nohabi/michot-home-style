import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/hooks/use-products";
import type { DbProduct } from "@/hooks/use-products";
import { useCart } from "@/lib/cart";
import { useTranslation } from "@/lib/i18n";
import { useWishlist } from "@/hooks/use-wishlist";
import { useAuth } from "@/lib/auth";
import { getProductImage } from "@/lib/product-images";
import { ShoppingCart, Star, Heart } from "lucide-react";

interface ProductCardProps {
  product: DbProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { t, language } = useTranslation();
  const { user } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const name = language === "am" && product.name_am ? product.name_am : product.name;
  const description = language === "am" && product.description_am ? product.description_am : product.description;

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
    <div className="group bg-card rounded-lg border border-border overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-[4/3] bg-secondary flex items-center justify-center relative overflow-hidden">
          {(() => {
            const imgSrc = getProductImage(product.name, product.images);
            return imgSrc ? (
              <img src={imgSrc} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" width={800} height={800} />
            ) : (
              <span className="text-muted-foreground font-heading text-lg">{product.category}</span>
            );
          })()}
          {product.original_price && (
            <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded">
              -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
            </span>
          )}
          {product.best_seller && (
            <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">
              {t("bestSeller")}
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-accent text-accent" />
          <span className="text-xs font-medium text-muted-foreground">
            {product.rating} ({product.review_count})
          </span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.original_price && (
              <span className="text-xs text-muted-foreground line-through">{formatPrice(product.original_price)}</span>
            )}
          </div>
          <div className="flex gap-1">
            {user && (
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-full"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-destructive text-destructive" : ""}`} />
              </Button>
            )}
            <Button
              size="icon"
              variant="hero"
              className="h-9 w-9 rounded-full"
              onClick={() => addItem(cartProduct)}
              aria-label={`${t("addToCart")} ${name}`}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
