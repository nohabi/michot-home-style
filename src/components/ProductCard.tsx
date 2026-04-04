import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group bg-card rounded-lg border border-border overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-[4/3] bg-secondary flex items-center justify-center relative overflow-hidden">
          <span className="text-muted-foreground font-heading text-lg">{product.category}</span>
          {product.originalPrice && (
            <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
          {product.bestSeller && (
            <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">
              Best Seller
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-accent text-accent" />
          <span className="text-xs font-medium text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <Button
            size="icon"
            variant="hero"
            className="h-9 w-9 rounded-full"
            onClick={() => addItem(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
