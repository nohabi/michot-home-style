import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, ArrowRight, CheckCircle, Users, Ruler, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

export default function BusinessPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "",
    description: "",
  });

  const benefits = [
    { icon: Building2, title: t("bulkPricing"), desc: t("bulkPricingDesc") },
    { icon: Ruler, title: t("customFurniture"), desc: t("customFurnitureDesc") },
    { icon: Users, title: t("dedicatedSupport"), desc: t("dedicatedSupportDesc") },
    { icon: Truck, title: t("priorityDelivery"), desc: t("priorityDeliveryDesc") },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("quote_requests").insert({
      user_id: user?.id || null,
      business_name: form.businessName,
      contact_name: form.contactName,
      contact_email: form.email || null,
      contact_phone: form.phone,
      business_type: form.businessType,
      furniture_type: form.businessType,
      description: form.description,
    });

    if (error) {
      toast.error("Failed to submit. Please try again.");
    } else {
      setSubmitted(true);
      toast.success(t("quoteSubmitted"));
    }
    setLoading(false);
  };

  return (
    <div>
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-custom max-w-3xl text-center">
          <p className="text-accent font-medium text-sm uppercase tracking-widest mb-4">{t("forBusinessTitle")}</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">{t("furnishingHotelsTitle")}</h1>
          <p className="text-lg opacity-80 max-w-xl mx-auto">{t("businessHeroDesc")}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold">{t("requestQuote")}</h2>
            <p className="text-muted-foreground mt-2">{t("requestQuoteDesc")}</p>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold mb-2">{t("requestReceived")}</h3>
              <p className="text-muted-foreground">{t("requestReceivedDesc")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("businessName")} *</label>
                  <Input required value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} placeholder={t("businessName")} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("contactPerson")} *</label>
                  <Input required value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} placeholder={t("fullName")} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("email")} *</label>
                  <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@business.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("phone")} *</label>
                  <Input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+251..." />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">{t("businessType")} *</label>
                <Select required value={form.businessType} onValueChange={(v) => setForm({ ...form, businessType: v })}>
                  <SelectTrigger><SelectValue placeholder={t("businessType")} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">{t("hotel")}</SelectItem>
                    <SelectItem value="restaurant">{t("restaurant")}</SelectItem>
                    <SelectItem value="office">{t("office")}</SelectItem>
                    <SelectItem value="other">{t("other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">{t("projectDescription")} *</label>
                <Textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder={t("projectDescPlaceholder")} rows={5} />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "..." : t("submitQuoteRequest")} <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
