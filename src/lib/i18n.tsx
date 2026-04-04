import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "am";

const translations = {
  en: {
    // Navbar
    home: "Home",
    shop: "Shop",
    forBusiness: "For Business",
    contact: "Contact",
    login: "Login",
    signUp: "Sign Up",
    account: "Account",
    orders: "My Orders",
    wishlist: "Wishlist",
    profile: "Profile",
    logout: "Logout",
    admin: "Admin",
    freeDelivery: "Free delivery within Tulu Dimtu on orders over ETB 20,000",
    freeDeliveryShort: "Free local delivery over ETB 20,000",
    searchProducts: "Search products",
    openCart: "Open cart",
    toggleMenu: "Toggle menu",

    // Home
    handcraftedInEthiopia: "Handcrafted in Ethiopia",
    furnitureThatTellsStory: "Furniture That Tells a Story",
    heroDescription: "Premium quality furniture for your home, hotel, or restaurant. Crafted with care in Addis Ababa, delivered to your doorstep.",
    shopNow: "Shop Now",
    shopByCategory: "Shop by Category",
    findPerfectPiece: "Find the perfect piece for every space",
    products: "products",
    featuredCollection: "Featured Collection",
    finestPieces: "Our finest pieces, curated for you",
    viewAll: "View All",
    bestSellers: "Best Sellers",
    whatCustomersLove: "What our customers love most",
    furnishingHotelsRestaurants: "Furnishing Hotels & Restaurants?",
    getSpecialPricing: "Get special pricing on bulk orders. Custom furniture solutions available for your business.",
    getBusinessQuote: "Get a Business Quote",
    freeLocalDelivery: "Free Local Delivery",
    freeLocalDeliveryDesc: "Free within Tulu Dimtu on orders over ETB 20,000",
    qualityGuaranteed: "Quality Guaranteed",
    qualityGuaranteedDesc: "Premium materials with 2-year warranty",
    expertSupport: "Expert Support",
    expertSupportDesc: "Dedicated team for personalized service",
    businessSolutions: "Business Solutions",
    businessSolutionsDesc: "Bulk orders for hotels and restaurants",

    // Shop
    shopAllFurniture: "Shop All Furniture",
    searchFurniture: "Search furniture...",
    sortBy: "Sort by",
    default: "Default",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    topRated: "Top Rated",
    name: "Name",
    category: "Category",
    material: "Material",
    usage: "Usage",
    filters: "Filters",
    clearFilters: "Clear Filters",
    noProductsFound: "No products found",

    // Product
    productNotFound: "Product Not Found",
    backToShop: "Back to Shop",
    bestSeller: "Best Seller",
    reviews: "reviews",
    addToCart: "Add to Cart",
    freeDeliveryWithin: "Free delivery within Tulu Dimtu on orders over ETB 20,000",
    twoYearGuarantee: "2-year quality guarantee",
    deliveryAcrossAddis: "Delivery across Addis Ababa",
    youMayAlsoLike: "You May Also Like",
    availability: "Availability",
    inStock: "In Stock",
    outOfStock: "Out of Stock",

    // Cart
    shoppingCart: "Shopping Cart",
    yourCartEmpty: "Your cart is empty",
    browseProducts: "Browse Products",
    total: "Total",
    proceedToCheckout: "Proceed to Checkout",
    continueShopping: "Continue Shopping",

    // Checkout
    checkout: "Checkout",
    contactInformation: "Contact Information",
    fullName: "Full Name",
    phone: "Phone",
    email: "Email",
    delivery: "Delivery",
    deliveryZone: "Delivery Zone",
    selectArea: "Select your area",
    deliveryAddress: "Delivery Address",
    streetAddress: "Street address or landmark",
    notes: "Notes",
    additionalInstructions: "Additional delivery instructions",
    payment: "Payment",
    paymentNote: "💰 Payment is collected upon delivery (Cash on Delivery). Our team will contact you to confirm your order.",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    free: "Free",
    placeOrder: "Place Order",
    orderConfirmed: "Order Confirmed!",
    orderConfirmedDesc: "Thank you for your order. We'll contact you to confirm delivery details.",

    // Contact
    getInTouch: "Get in Touch",
    weLoveToHear: "We'd love to hear from you",
    contactInfo: "Contact Information",
    location: "Location",
    locationValue: "Tulu Dimtu, Addis Ababa, Ethiopia",
    hours: "Hours",
    monSat: "Mon–Sat: 8:00 AM – 6:00 PM",
    sun: "Sun: 10:00 AM – 4:00 PM",
    sendMessage: "Send a Message",
    yourName: "Your name",
    yourEmail: "your@email.com",
    howCanWeHelp: "How can we help you?",
    messageSent: "Message sent! We'll get back to you soon.",
    thankYou: "Thank you!",
    getBackWithin24: "We'll get back to you within 24 hours.",
    sendAnother: "Send Another",
    message: "Message",

    // Business
    forBusinessTitle: "For Business",
    furnishingHotelsTitle: "Furnishing Hotels & Restaurants",
    businessHeroDesc: "Equip your commercial space with premium, durable furniture. Bulk pricing, custom designs, and priority delivery across Addis Ababa.",
    bulkPricing: "Bulk Pricing",
    bulkPricingDesc: "Special discounts on large orders for hotels and restaurants",
    customFurniture: "Custom Furniture",
    customFurnitureDesc: "Made-to-measure pieces designed for your exact specifications",
    dedicatedSupport: "Dedicated Support",
    dedicatedSupportDesc: "A personal account manager for your business needs",
    priorityDelivery: "Priority Delivery",
    priorityDeliveryDesc: "Fast, reliable delivery and installation for commercial orders",
    requestQuote: "Request a Quote",
    requestQuoteDesc: "Tell us about your project and we'll provide a custom quote within 24 hours",
    businessName: "Business Name",
    contactPerson: "Contact Person",
    businessType: "Business Type",
    hotel: "Hotel",
    restaurant: "Restaurant",
    office: "Office",
    other: "Other",
    projectDescription: "Project Description",
    projectDescPlaceholder: "Describe what furniture you need, quantities, and any specific requirements...",
    submitQuoteRequest: "Submit Quote Request",
    requestReceived: "Request Received!",
    requestReceivedDesc: "Our team will review your requirements and get back to you within 24 hours.",
    quoteSubmitted: "Quote request submitted! We'll contact you within 24 hours.",

    // Footer
    footerDesc: "Premium quality furniture for homes, hotels, and restaurants in Addis Ababa and beyond.",
    quickLinks: "Quick Links",
    shopAll: "Shop All",
    contactUs: "Contact Us",
    categories: "Categories",
    allRightsReserved: "All rights reserved.",

    // Auth
    signIn: "Sign In",
    signInDesc: "Welcome back to Michot Furniture",
    signUpDesc: "Create your Michot Furniture account",
    password: "Password",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot password?",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    displayName: "Display Name",

    // Theme
    lightMode: "Light",
    darkMode: "Dark",
    theme: "Theme",

    // Language
    language: "Language",
    english: "English",
    amharic: "አማርኛ",
  },

  am: {
    // Navbar
    home: "ዋና ገፅ",
    shop: "ሱቅ",
    forBusiness: "ለንግድ",
    contact: "ያግኙን",
    login: "ግባ",
    signUp: "ተመዝገብ",
    account: "መለያ",
    orders: "ትዕዛዞቼ",
    wishlist: "ምኞት ዝርዝር",
    profile: "መገለጫ",
    logout: "ውጣ",
    admin: "አስተዳዳሪ",
    freeDelivery: "በቱሉ ዲምቱ ውስጥ ከ20,000 ብር በላይ ላሉ ትዕዛዞች ነፃ ማድረስ",
    freeDeliveryShort: "ከ20,000 ብር በላይ ነፃ ማድረስ",
    searchProducts: "ምርቶችን ፈልግ",
    openCart: "ጋሪ ክፈት",
    toggleMenu: "ምናሌ ቀያይር",

    // Home
    handcraftedInEthiopia: "በኢትዮጵያ የተሠሩ",
    furnitureThatTellsStory: "ታሪክ የሚናገር ዕቃ",
    heroDescription: "ለቤትዎ፣ ሆቴልዎ ወይም ሬስቶራንትዎ ከፍተኛ ጥራት ያለው ዕቃ። በአዲስ አበባ ውስጥ በጥንቃቄ ተሠርቶ ወደ ቤትዎ ይደርሳል።",
    shopNow: "አሁን ግዛ",
    shopByCategory: "በምድብ ግዛ",
    findPerfectPiece: "ለእያንዳንዱ ቦታ ፍጹም ዕቃ ያግኙ",
    products: "ምርቶች",
    featuredCollection: "ተመራጭ ስብስብ",
    finestPieces: "ለእርስዎ የተመረጡ ምርጥ ዕቃዎች",
    viewAll: "ሁሉንም ይመልከቱ",
    bestSellers: "ምርጥ ሽያጮች",
    whatCustomersLove: "ደንበኞቻችን በጣም የሚወዱት",
    furnishingHotelsRestaurants: "ሆቴሎችና ሬስቶራንቶች ያስታጥቃሉ?",
    getSpecialPricing: "በጅምላ ትዕዛዞች ልዩ ዋጋ ያግኙ። ለንግድዎ ብጁ የዕቃ መፍትሄዎች ይገኛሉ።",
    getBusinessQuote: "የንግድ ዋጋ ያግኙ",
    freeLocalDelivery: "ነፃ አካባቢ ማድረስ",
    freeLocalDeliveryDesc: "ከ20,000 ብር በላይ ላሉ ትዕዛዞች በቱሉ ዲምቱ ውስጥ ነፃ",
    qualityGuaranteed: "ጥራት ዋስትና",
    qualityGuaranteedDesc: "ከ2 ዓመት ዋስትና ጋር ከፍተኛ ጥራት ያላቸው ቁሳቁሶች",
    expertSupport: "ባለሙያ ድጋፍ",
    expertSupportDesc: "ለግል አገልግሎት የተዘጋጀ ቡድን",
    businessSolutions: "የንግድ መፍትሄዎች",
    businessSolutionsDesc: "ለሆቴሎችና ሬስቶራንቶች ጅምላ ትዕዛዞች",

    // Shop
    shopAllFurniture: "ሁሉንም ዕቃ ግዛ",
    searchFurniture: "ዕቃ ፈልግ...",
    sortBy: "ደርድር",
    default: "ነባሪ",
    priceLowToHigh: "ዋጋ: ዝቅተኛ ወደ ከፍተኛ",
    priceHighToLow: "ዋጋ: ከፍተኛ ወደ ዝቅተኛ",
    topRated: "ከፍተኛ ደረጃ",
    name: "ስም",
    category: "ምድብ",
    material: "ቁሳቁስ",
    usage: "አጠቃቀም",
    filters: "ማጣሪያዎች",
    clearFilters: "ማጣሪያ ያጽዱ",
    noProductsFound: "ምንም ምርቶች አልተገኙም",

    // Product
    productNotFound: "ምርቱ አልተገኘም",
    backToShop: "ወደ ሱቅ ተመለስ",
    bestSeller: "ምርጥ ሽያጭ",
    reviews: "ግምገማዎች",
    addToCart: "ወደ ጋሪ ጨምር",
    freeDeliveryWithin: "ከ20,000 ብር በላይ ላሉ ትዕዛዞች በቱሉ ዲምቱ ውስጥ ነፃ ማድረስ",
    twoYearGuarantee: "የ2 ዓመት ጥራት ዋስትና",
    deliveryAcrossAddis: "በአዲስ አበባ ውስጥ ማድረስ",
    youMayAlsoLike: "እርስዎም ሊወዱ ይችላሉ",
    availability: "ተገኝነት",
    inStock: "በክምችት ውስጥ",
    outOfStock: "ክምችት የለም",

    // Cart
    shoppingCart: "የግዢ ጋሪ",
    yourCartEmpty: "ጋሪዎ ባዶ ነው",
    browseProducts: "ምርቶችን ይመልከቱ",
    total: "ጠቅላላ",
    proceedToCheckout: "ወደ ክፍያ ቀጥል",
    continueShopping: "መገበያየትን ቀጥል",

    // Checkout
    checkout: "ክፍያ",
    contactInformation: "የእውቂያ መረጃ",
    fullName: "ሙሉ ስም",
    phone: "ስልክ",
    email: "ኢሜይል",
    delivery: "ማድረስ",
    deliveryZone: "የማድረስ ቀጠና",
    selectArea: "አካባቢዎን ይምረጡ",
    deliveryAddress: "የማድረስ አድራሻ",
    streetAddress: "የጎዳና አድራሻ ወይም ምልክት",
    notes: "ማስታወሻዎች",
    additionalInstructions: "ተጨማሪ የማድረስ መመሪያዎች",
    payment: "ክፍያ",
    paymentNote: "💰 ክፍያ በማድረስ ጊዜ ይሰበሰባል (በማድረስ ጊዜ ክፍያ)። ቡድናችን ትዕዛዝዎን ለማረጋገጥ ያገኝዎታል።",
    orderSummary: "የትዕዛዝ ማጠቃለያ",
    subtotal: "ንዑስ ድምር",
    free: "ነፃ",
    placeOrder: "ትዕዛዝ ያስገቡ",
    orderConfirmed: "ትዕዛዝ ተረጋግጧል!",
    orderConfirmedDesc: "ለትዕዛዝዎ እናመሰግናለን። የማድረስ ዝርዝሮችን ለማረጋገጥ እናገኝዎታለን።",

    // Contact
    getInTouch: "ያግኙን",
    weLoveToHear: "ከእርስዎ መስማት እንፈልጋለን",
    contactInfo: "የእውቂያ መረጃ",
    location: "ቦታ",
    locationValue: "ቱሉ ዲምቱ፣ አዲስ አበባ፣ ኢትዮጵያ",
    hours: "ሰዓቶች",
    monSat: "ሰኞ–ቅዳሜ: 8:00 ጥዋት – 6:00 ከሰዓት",
    sun: "እሁድ: 10:00 ጥዋት – 4:00 ከሰዓት",
    sendMessage: "መልዕክት ላክ",
    yourName: "ስምዎ",
    yourEmail: "your@email.com",
    howCanWeHelp: "እንዴት ልንረዳዎ እንችላለን?",
    messageSent: "መልዕክት ተልኳል! በቅርቡ እናገኝዎታለን።",
    thankYou: "እናመሰግናለን!",
    getBackWithin24: "በ24 ሰዓታት ውስጥ እናገኝዎታለን።",
    sendAnother: "ሌላ ላክ",
    message: "መልዕክት",

    // Business
    forBusinessTitle: "ለንግድ",
    furnishingHotelsTitle: "ሆቴሎችና ሬስቶራንቶችን ማስታጠቅ",
    businessHeroDesc: "የንግድ ቦታዎን በከፍተኛ ጥራት ባለው ዕቃ ያስታጥቁ። ጅምላ ዋጋ፣ ብጁ ንድፎች፣ በአዲስ አበባ ውስጥ ቅድሚያ ማድረስ።",
    bulkPricing: "ጅምላ ዋጋ",
    bulkPricingDesc: "ለሆቴሎችና ሬስቶራንቶች ትልልቅ ትዕዛዞች ልዩ ቅናሾች",
    customFurniture: "ብጁ ዕቃ",
    customFurnitureDesc: "ለትክክለኛ ዝርዝር መግለጫዎችዎ የተነደፉ ዕቃዎች",
    dedicatedSupport: "ልዩ ድጋፍ",
    dedicatedSupportDesc: "ለንግድ ፍላጎቶችዎ የግል መለያ አስተዳዳሪ",
    priorityDelivery: "ቅድሚያ ማድረስ",
    priorityDeliveryDesc: "ለንግድ ትዕዛዞች ፈጣንና አስተማማኝ ማድረስ",
    requestQuote: "ዋጋ ጠይቅ",
    requestQuoteDesc: "ስለ ፕሮጀክትዎ ይንገሩን በ24 ሰዓታት ውስጥ ብጁ ዋጋ እናቀርባለን",
    businessName: "የንግድ ስም",
    contactPerson: "ተገናኝ ሰው",
    businessType: "የንግድ ዓይነት",
    hotel: "ሆቴል",
    restaurant: "ሬስቶራንት",
    office: "ቢሮ",
    other: "ሌላ",
    projectDescription: "የፕሮጀክት ገለፃ",
    projectDescPlaceholder: "ምን ዓይነት ዕቃ እንደሚያስፈልግዎ፣ መጠኖች፣ እና ማንኛውም ልዩ መስፈርቶች ይግለፁ...",
    submitQuoteRequest: "የዋጋ ጥያቄ ያስገቡ",
    requestReceived: "ጥያቄ ተቀብሏል!",
    requestReceivedDesc: "ቡድናችን መስፈርቶችዎን ይገመግምና በ24 ሰዓታት ውስጥ ያገኝዎታል።",
    quoteSubmitted: "የዋጋ ጥያቄ ቀርቧል! በ24 ሰዓታት ውስጥ እናገኝዎታለን።",

    // Footer
    footerDesc: "በአዲስ አበባና ከዚያ ባሻገር ለቤቶች፣ ሆቴሎችና ሬስቶራንቶች ከፍተኛ ጥራት ያለው ዕቃ።",
    quickLinks: "ፈጣን ማገናኛዎች",
    shopAll: "ሁሉንም ግዛ",
    contactUs: "ያግኙን",
    categories: "ምድቦች",
    allRightsReserved: "ሁሉም መብቶች የተጠበቁ ናቸው።",

    // Auth
    signIn: "ግባ",
    signInDesc: "ወደ ሚቾት ዕቃ እንኳን ደህና ተመለሱ",
    signUpDesc: "የሚቾት ዕቃ መለያ ይፍጠሩ",
    password: "የይለፍ ቃል",
    confirmPassword: "የይለፍ ቃል ያረጋግጡ",
    forgotPassword: "የይለፍ ቃል ረሱ?",
    noAccount: "መለያ የለዎትም?",
    haveAccount: "ቀድሞ መለያ አለዎት?",
    displayName: "ማሳያ ስም",

    // Theme
    lightMode: "ብሩህ",
    darkMode: "ጨለማ",
    theme: "ገጽታ",

    // Language
    language: "ቋንቋ",
    english: "English",
    amharic: "አማርኛ",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("michot-lang");
      return (saved === "am" ? "am" : "en") as Language;
    } catch {
      return "en";
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("michot-lang", lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useTranslation must be used within I18nProvider");
  return context;
}
