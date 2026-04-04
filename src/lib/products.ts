export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  material: string;
  usage: string[];
  images: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestSeller: boolean;
}

export const categories = [
  "Sofas & Couches",
  "Beds & Mattresses",
  "Dining Tables",
  "Chairs",
  "Office Furniture",
  "Decor & Accessories",
] as const;

export const materials = [
  "Solid Wood",
  "Engineered Wood",
  "Metal",
  "Leather",
  "Fabric",
  "Glass",
] as const;

export const usageTypes = ["Home", "Hotel", "Restaurant", "Office"] as const;

export const products: Product[] = [
  {
    id: "1",
    name: "Addis Walnut Sofa",
    description: "A beautifully crafted 3-seater sofa with premium walnut frame and plush cushions. Perfect for living rooms and hotel lobbies. Features durable fabric upholstery and ergonomic design for maximum comfort.",
    price: 45000,
    originalPrice: 52000,
    category: "Sofas & Couches",
    material: "Solid Wood",
    usage: ["Home", "Hotel"],
    images: [],
    inStock: true,
    stockCount: 12,
    rating: 4.8,
    reviewCount: 24,
    featured: true,
    bestSeller: true,
  },
  {
    id: "2",
    name: "Habesha Dining Table Set",
    description: "Elegant 6-seater dining table crafted from Ethiopian hardwood. Includes matching chairs with cushioned seats. Ideal for family dining rooms and restaurants.",
    price: 38000,
    category: "Dining Tables",
    material: "Solid Wood",
    usage: ["Home", "Restaurant"],
    images: [],
    inStock: true,
    stockCount: 8,
    rating: 4.9,
    reviewCount: 31,
    featured: true,
    bestSeller: true,
  },
  {
    id: "3",
    name: "Modern Office Desk",
    description: "Sleek contemporary office desk with cable management and built-in drawers. Engineered wood with metal legs for a modern look.",
    price: 15000,
    category: "Office Furniture",
    material: "Engineered Wood",
    usage: ["Home", "Office"],
    images: [],
    inStock: true,
    stockCount: 20,
    rating: 4.5,
    reviewCount: 15,
    featured: false,
    bestSeller: false,
  },
  {
    id: "4",
    name: "Queen Platform Bed",
    description: "Minimalist queen-size platform bed with solid wood frame and upholstered headboard. Built to last with premium materials.",
    price: 32000,
    originalPrice: 38000,
    category: "Beds & Mattresses",
    material: "Solid Wood",
    usage: ["Home", "Hotel"],
    images: [],
    inStock: true,
    stockCount: 6,
    rating: 4.7,
    reviewCount: 19,
    featured: true,
    bestSeller: false,
  },
  {
    id: "5",
    name: "Leather Accent Chair",
    description: "Premium leather accent chair with solid wood legs. Adds sophistication to any room. Perfect for reading corners and hotel rooms.",
    price: 18000,
    category: "Chairs",
    material: "Leather",
    usage: ["Home", "Hotel"],
    images: [],
    inStock: true,
    stockCount: 15,
    rating: 4.6,
    reviewCount: 12,
    featured: false,
    bestSeller: true,
  },
  {
    id: "6",
    name: "Restaurant Bar Stool Set",
    description: "Set of 4 industrial-style bar stools with metal frames and cushioned seats. Designed for commercial use in restaurants and bars.",
    price: 22000,
    category: "Chairs",
    material: "Metal",
    usage: ["Restaurant", "Hotel"],
    images: [],
    inStock: true,
    stockCount: 10,
    rating: 4.4,
    reviewCount: 8,
    featured: false,
    bestSeller: false,
  },
  {
    id: "7",
    name: "King Size Luxury Bed",
    description: "Premium king-size bed with tufted headboard and solid hardwood frame. Hotel-grade quality with elegant design.",
    price: 55000,
    category: "Beds & Mattresses",
    material: "Solid Wood",
    usage: ["Home", "Hotel"],
    images: [],
    inStock: true,
    stockCount: 4,
    rating: 4.9,
    reviewCount: 27,
    featured: true,
    bestSeller: true,
  },
  {
    id: "8",
    name: "Decorative Wall Shelf",
    description: "Floating wall shelf set with elegant design. Perfect for displaying decor items and books. Easy to install.",
    price: 4500,
    category: "Decor & Accessories",
    material: "Engineered Wood",
    usage: ["Home", "Office"],
    images: [],
    inStock: true,
    stockCount: 30,
    rating: 4.3,
    reviewCount: 22,
    featured: false,
    bestSeller: false,
  },
  {
    id: "9",
    name: "L-Shaped Sectional Sofa",
    description: "Spacious L-shaped sectional sofa with fabric upholstery. Modular design lets you configure to your space. Great for large living rooms and hotel lounges.",
    price: 62000,
    category: "Sofas & Couches",
    material: "Fabric",
    usage: ["Home", "Hotel"],
    images: [],
    inStock: true,
    stockCount: 3,
    rating: 4.7,
    reviewCount: 16,
    featured: true,
    bestSeller: false,
  },
  {
    id: "10",
    name: "Glass Coffee Table",
    description: "Modern coffee table with tempered glass top and metal frame. Adds a contemporary touch to any setting.",
    price: 12000,
    category: "Decor & Accessories",
    material: "Glass",
    usage: ["Home", "Hotel", "Office"],
    images: [],
    inStock: true,
    stockCount: 18,
    rating: 4.5,
    reviewCount: 10,
    featured: false,
    bestSeller: false,
  },
  {
    id: "11",
    name: "Commercial Dining Chair Set",
    description: "Set of 6 stackable dining chairs designed for high-traffic restaurant use. Durable construction with easy-clean fabric seats.",
    price: 28000,
    category: "Chairs",
    material: "Metal",
    usage: ["Restaurant"],
    images: [],
    inStock: true,
    stockCount: 14,
    rating: 4.6,
    reviewCount: 9,
    featured: false,
    bestSeller: false,
  },
  {
    id: "12",
    name: "Executive Office Chair",
    description: "Ergonomic high-back executive chair with leather upholstery, lumbar support, and adjustable height. Built for long hours of comfort.",
    price: 16000,
    category: "Office Furniture",
    material: "Leather",
    usage: ["Office", "Home"],
    images: [],
    inStock: true,
    stockCount: 11,
    rating: 4.4,
    reviewCount: 14,
    featured: false,
    bestSeller: true,
  },
];

export function formatPrice(price: number): string {
  return `ETB ${price.toLocaleString()}`;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
