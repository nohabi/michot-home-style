import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl font-bold">Get in Touch</h1>
          <p className="text-muted-foreground mt-2">We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Location</h3>
                    <p className="text-muted-foreground text-sm mt-1">Tulu Dimtu, Addis Ababa, Ethiopia</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Phone</h3>
                    <a href="tel:+15554827391" className="text-muted-foreground text-sm mt-1 hover:text-accent transition-colors">+1 (555) 482-7391</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Email</h3>
                    <a href="mailto:desalegnsisay052@gmail.com" className="text-muted-foreground text-sm mt-1 hover:text-accent transition-colors">desalegnsisay052@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Hours</h3>
                    <p className="text-muted-foreground text-sm mt-1">Mon–Sat: 8:00 AM – 6:00 PM</p>
                    <p className="text-muted-foreground text-sm">Sun: 10:00 AM – 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-secondary rounded-lg aspect-video flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Tulu Dimtu, Addis Ababa</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="font-heading text-xl font-semibold mb-6">Send a Message</h2>
            {submitted ? (
              <div className="text-center py-12">
                <p className="text-lg font-medium">Thank you!</p>
                <p className="text-muted-foreground mt-2">We'll get back to you within 24 hours.</p>
                <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name *</label>
                  <Input required placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input required type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone</label>
                  <Input type="tel" placeholder="+251..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message *</label>
                  <Textarea required placeholder="How can we help you?" rows={5} />
                </div>
                <Button type="submit" className="w-full" size="lg">Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
