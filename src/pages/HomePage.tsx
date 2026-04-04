import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/products";
import { ArrowRight, Truck, Shield, Headphones, Building2 } from "lucide-react";
import heroImage from "@/assets/hero-living.jpg";
import { ArrowRight, Truck, Shield, Headphones, Building2 } from "lucide-react";

const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);

const features = [
  { icon: Truck, title: "Free Local Delivery", desc: "Free within Tulu Dimtu on orders over ETB 20,000" },
  { icon: Shield, title: "Quality Guaranteed", desc: "Premium materials with 2-year warranty" },
  { icon: Headphones, title: "Expert Support", desc: "Dedicated team for personalized service" },
  { icon: Building2, title: "Business Solutions", desc: "Bulk orders for hotels and restaurants" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <p className="text-accent font-medium text-sm uppercase tracking-widest mb-4">
              Handcrafted in Ethiopia
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Furniture That Tells a Story
            </h1>
            <p className="text-lg opacity-80 mb-8 leading-relaxed max-w-lg">
              Premium quality furniture for your home, hotel, or restaurant.
              Crafted with care in Addis Ababa, delivered to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/shop">Shop Now <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/business">For Business</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-40 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-card border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4 p-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{f.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground mt-2">Find the perfect piece for every space</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/shop?category=${encodeURIComponent(cat)}`}
                className="group bg-secondary rounded-lg p-6 text-center hover:bg-accent/10 transition-colors border border-border"
              >
                <h3 className="font-heading text-base font-semibold group-hover:text-accent transition-colors">
                  {cat}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {products.filter((p) => p.category === cat).length} products
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading text-3xl font-bold">Featured Collection</h2>
              <p className="text-muted-foreground mt-2">Our finest pieces, curated for you</p>
            </div>
            <Button variant="link" asChild className="hidden sm:flex">
              <Link to="/shop">View All <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading text-3xl font-bold">Best Sellers</h2>
              <p className="text-muted-foreground mt-2">What our customers love most</p>
            </div>
            <Button variant="link" asChild className="hidden sm:flex">
              <Link to="/shop">View All <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">Furnishing Hotels & Restaurants?</h2>
          <p className="opacity-80 max-w-lg mx-auto mb-8">
            Get special pricing on bulk orders. Custom furniture solutions available for your business.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/business">Get a Business Quote <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
