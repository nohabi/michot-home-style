import addisWalnutSofa from "@/assets/products/addis-walnut-sofa.jpg";
import habeshaDiningTable from "@/assets/products/habesha-dining-table.jpg";
import modernOfficeDesk from "@/assets/products/modern-office-desk.jpg";
import queenPlatformBed from "@/assets/products/queen-platform-bed.jpg";
import leatherAccentChair from "@/assets/products/leather-accent-chair.jpg";
import restaurantBarStool from "@/assets/products/restaurant-bar-stool.jpg";
import kingLuxuryBed from "@/assets/products/king-luxury-bed.jpg";
import decorativeWallShelf from "@/assets/products/decorative-wall-shelf.jpg";
import lShapedSectionalSofa from "@/assets/products/l-shaped-sectional-sofa.jpg";
import glassCoffeeTable from "@/assets/products/glass-coffee-table.jpg";
import commercialDiningChairs from "@/assets/products/commercial-dining-chairs.jpg";
import executiveOfficeChair from "@/assets/products/executive-office-chair.jpg";

// Map product names to local images as fallback when DB images array is empty
const productImageMap: Record<string, string> = {
  "Addis Walnut Sofa": addisWalnutSofa,
  "Habesha Dining Table Set": habeshaDiningTable,
  "Modern Office Desk": modernOfficeDesk,
  "Queen Platform Bed": queenPlatformBed,
  "Leather Accent Chair": leatherAccentChair,
  "Restaurant Bar Stool Set": restaurantBarStool,
  "King Size Luxury Bed": kingLuxuryBed,
  "Decorative Wall Shelf": decorativeWallShelf,
  "L-Shaped Sectional Sofa": lShapedSectionalSofa,
  "Glass Coffee Table": glassCoffeeTable,
  "Commercial Dining Chair Set": commercialDiningChairs,
  "Executive Office Chair": executiveOfficeChair,
};

export function getProductImage(productName: string, dbImages: string[]): string {
  // Use DB image if available
  if (dbImages && dbImages.length > 0 && dbImages[0]) {
    return dbImages[0];
  }
  // Fallback to local asset
  return productImageMap[productName] || "";
}
