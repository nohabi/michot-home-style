import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/use-products";
import { useTranslation } from "@/lib/i18n";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Truck, Shield, Headphones, Building2 } from "lucide-react";
import heroImage from "@/assets/hero-living.jpg";

const categories = [
  "Sofas & Couches",
  "Beds & Mattresses",
  "Dining Tables",
  "Chairs",
  "Office Furniture",
  "Decor & Accessories",
];

export default function HomePage() {
  const { data: products, isLoading } = useProducts();
  const { t } = useTranslation();

  const featuredProducts = (products || []).filter((p) => p.featured).slice(0, 4);
  const bestSellers = (products || []).filter((p) => p.best_seller).slice(0, 4);

  const features = [
    { icon: Truck, title: t("freeLocalDelivery"), desc: t("freeLocalDeliveryDesc") },
    { icon: Shield, title: t("qualityGuaranteed"), desc: t("qualityGuaranteedDesc") },
    { icon: Headphones, title: t("expertSupport"), desc: t("expertSupportDesc") },
    { icon: Building2, title: t("businessSolutions"), desc: t("businessSolutionsDesc") },
  ];

  const ProductSkeleton = () => (
    <div className="rounded-lg border border-border overflow-hidden">
      <Skeleton className="aspect-[4/3]" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Michot Furniture showroom" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-transparent" />
        </div>
        <div className="container-custom relative z-10 section-padding">
          <div className="max-w-2xl text-primary-foreground">
            <p className="text-accent font-medium text-sm uppercase tracking-widest mb-4">
              {t("handcraftedInEthiopia")}
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t("furnitureThatTellsStory")}
            </h1>
            <p className="text-lg opacity-80 mb-8 leading-relaxed max-w-lg">
              {t("heroDescription")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/shop">{t("shopNow")} <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/business">{t("forBusiness")}</Link>
              </Button>
            </div>
          </div>
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
            <h2 className="font-heading text-3xl font-bold">{t("shopByCategory")}</h2>
            <p className="text-muted-foreground mt-2">{t("findPerfectPiece")}</p>
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
                  {(products || []).filter((p) => p.category === cat).length} {t("products")}
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
              <h2 className="font-heading text-3xl font-bold">{t("featuredCollection")}</h2>
              <p className="text-muted-foreground mt-2">{t("finestPieces")}</p>
            </div>
            <Button variant="link" asChild className="hidden sm:flex">
              <Link to="/shop">{t("viewAll")} <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
              : featuredProducts.map((p) => <ProductCard key={p.id} product={p} />)
            }
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading text-3xl font-bold">{t("bestSellers")}</h2>
              <p className="text-muted-foreground mt-2">{t("whatCustomersLove")}</p>
            </div>
            <Button variant="link" asChild className="hidden sm:flex">
              <Link to="/shop">{t("viewAll")} <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
              : bestSellers.map((p) => <ProductCard key={p.id} product={p} />)
            }
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">{t("furnishingHotelsRestaurants")}</h2>
          <p className="opacity-80 max-w-lg mx-auto mb-8">{t("getSpecialPricing")}</p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/business">{t("getBusinessQuote")} <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
