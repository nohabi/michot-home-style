import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, ArrowRight, CheckCircle, Users, Ruler, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const benefits = [
  { icon: Building2, title: "Bulk Pricing", desc: "Special discounts on large orders for hotels and restaurants" },
  { icon: Ruler, title: "Custom Furniture", desc: "Made-to-measure pieces designed for your exact specifications" },
  { icon: Users, title: "Dedicated Support", desc: "A personal account manager for your business needs" },
  { icon: Truck, title: "Priority Delivery", desc: "Fast, reliable delivery and installation for commercial orders" },
];

export default function BusinessPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Quote request submitted! We'll contact you within 24 hours.");
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-custom max-w-3xl text-center">
          <p className="text-accent font-medium text-sm uppercase tracking-widest mb-4">For Business</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">Furnishing Hotels & Restaurants</h1>
          <p className="text-lg opacity-80 max-w-xl mx-auto">
            Equip your commercial space with premium, durable furniture. Bulk pricing, custom designs, and priority delivery across Addis Ababa.
          </p>
        </div>
      </section>

      {/* Benefits */}
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

      {/* Quote Form */}
      <section className="section-padding bg-card">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold">Request a Quote</h2>
            <p className="text-muted-foreground mt-2">Tell us about your project and we'll provide a custom quote within 24 hours</p>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold mb-2">Request Received!</h3>
              <p className="text-muted-foreground">Our team will review your requirements and get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Business Name *</label>
                  <Input required placeholder="Your business name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Contact Person *</label>
                  <Input required placeholder="Full name" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input required type="email" placeholder="email@business.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone *</label>
                  <Input required type="tel" placeholder="+251..." />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Business Type *</label>
                <Select required>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Project Description *</label>
                <Textarea required placeholder="Describe what furniture you need, quantities, and any specific requirements..." rows={5} />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Submit Quote Request <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
