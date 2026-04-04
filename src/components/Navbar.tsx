import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Phone, Search, Sun, Moon, Globe, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useTranslation } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const { t, language, setLanguage } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: t("home") },
    { to: "/shop", label: t("shop") },
    { to: "/business", label: t("forBusiness") },
    { to: "/contact", label: t("contact") },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs py-2">
        <div className="container-custom flex justify-between items-center px-4">
          <span className="hidden sm:inline">{t("freeDelivery")}</span>
          <span className="sm:hidden">{t("freeDeliveryShort")}</span>
          <a href="tel:+15554827391" className="flex items-center gap-1 hover:text-accent transition-colors">
            <Phone className="w-3 h-3" />
            +1 (555) 482-7391
          </a>
        </div>
      </div>

      {/* Main nav */}
      <header className="bg-card sticky top-0 z-50 border-b border-border">
        <div className="container-custom flex items-center justify-between h-16 px-4">
          <Link to="/" className="font-heading text-2xl font-bold text-primary tracking-tight">
            Michot<span className="text-accent">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  location.pathname === l.to ? "text-accent" : "text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            {/* Language toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === "en" ? "am" : "en")}
              aria-label="Switch language"
              title={language === "en" ? "አማርኛ" : "English"}
            >
              <Globe className="w-4 h-4" />
            </Button>

            {/* Theme toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>

            <Link to="/shop">
              <Button variant="ghost" size="icon" aria-label={t("searchProducts")}>
                <Search className="w-5 h-5" />
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)} aria-label={t("openCart")}>
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* User menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="w-full">{t("account")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="w-full">{t("orders")}</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="w-full">{t("admin")}</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="hidden sm:flex text-sm">
                  {t("login")}
                </Button>
                <Button variant="ghost" size="icon" className="sm:hidden">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            )}

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={t("toggleMenu")}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-border bg-card animate-fade-in">
            <div className="container-custom py-4 px-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium py-2 transition-colors ${
                    location.pathname === l.to ? "text-accent" : "text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              {!user && (
                <Link to="/auth" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2 text-accent">
                  {t("login")} / {t("signUp")}
                </Link>
              )}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
