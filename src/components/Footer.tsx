import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">
              Michot<span className="text-accent">.</span>
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">{t("footerDesc")}</p>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-4">{t("quickLinks")}</h4>
            <div className="flex flex-col gap-2 text-sm opacity-80">
              <Link to="/shop" className="hover:text-accent transition-colors">{t("shopAll")}</Link>
              <Link to="/business" className="hover:text-accent transition-colors">{t("forBusiness")}</Link>
              <Link to="/contact" className="hover:text-accent transition-colors">{t("contactUs")}</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-4">{t("categories")}</h4>
            <div className="flex flex-col gap-2 text-sm opacity-80">
              <Link to="/shop?category=Sofas+%26+Couches" className="hover:text-accent transition-colors">Sofas & Couches</Link>
              <Link to="/shop?category=Beds+%26+Mattresses" className="hover:text-accent transition-colors">Beds & Mattresses</Link>
              <Link to="/shop?category=Dining+Tables" className="hover:text-accent transition-colors">Dining Tables</Link>
              <Link to="/shop?category=Chairs" className="hover:text-accent transition-colors">Chairs</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-4">{t("contact")}</h4>
            <div className="flex flex-col gap-3 text-sm opacity-80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{t("locationValue")}</span>
              </div>
              <a href="tel:+15554827391" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                +1 (555) 482-7391
              </a>
              <a href="mailto:desalegnsisay052@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                desalegnsisay052@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center text-sm opacity-60">
          © {new Date().getFullYear()} Michot Furniture. {t("allRightsReserved")}
        </div>
      </div>
    </footer>
  );
}
