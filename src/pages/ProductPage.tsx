import { useParams, Link } from "react-router-dom";
import { getProductById, formatPrice, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { ShoppingCart, Star, Minus, Plus, ArrowLeft, Truck, Shield, Package } from "lucide-react";
import { useState } from "react";

export default function ProductPage() {
  const { id } = useParams();
  const product = getProductById(id || "");
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="section-padding text-center">
        <div className="container-custom">
          <h1 className="font-heading text-2xl font-bold mb-4">Product Not Found</h1>
          <Button asChild><Link to="/shop">Back to Shop</Link></Button>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="section-padding">
      <div className="container-custom">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground font-heading text-2xl">{product.category}</span>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              {product.bestSeller && (
                <span className="bg-accent/10 text-accent text-xs font-semibold px-2 py-0.5 rounded">Best Seller</span>
              )}
            </div>

            <h1 className="font-heading text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="bg-muted rounded-md p-3">
                <span className="text-muted-foreground">Category</span>
                <p className="font-medium">{product.category}</p>
              </div>
              <div className="bg-muted rounded-md p-3">
                <span className="text-muted-foreground">Material</span>
                <p className="font-medium">{product.material}</p>
              </div>
              <div className="bg-muted rounded-md p-3">
                <span className="text-muted-foreground">Usage</span>
                <p className="font-medium">{product.usage.join(", ")}</p>
              </div>
              <div className="bg-muted rounded-md p-3">
                <span className="text-muted-foreground">Availability</span>
                <p className={`font-medium ${product.inStock ? "text-green-600" : "text-destructive"}`}>
                  {product.inStock ? `In Stock (${product.stockCount})` : "Out of Stock"}
                </p>
              </div>
            </div>

            {/* Quantity and add to cart */}
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
              <Button className="flex-1" size="lg" onClick={() => addItem(product, quantity)} disabled={!product.inStock}>
                <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
              </Button>
            </div>

            {/* Guarantees */}
            <div className="space-y-3 border-t border-border pt-6">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-4 h-4 text-accent" />
                <span>Free delivery within Tulu Dimtu on orders over ETB 20,000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-4 h-4 text-accent" />
                <span>2-year quality guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Package className="w-4 h-4 text-accent" />
                <span>Delivery across Addis Ababa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-heading text-2xl font-bold mb-8">You May Also Like</h2>
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
