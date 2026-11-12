import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { contactCopy } from "@/data/content";
import { site } from "@/data/site";
import { TBC } from "@/data/types";
import { QuoteEnquiryForm } from "@/components/forms/QuoteEnquiryForm";

/** Static contact details + the online enquiry form (#enquiry). */
export function ContactSection() {
  const rows = [
    { icon: Phone, label: "Phone", value: site.contact.phone },
    { icon: Mail, label: "Email", value: site.contact.email },
    { icon: MapPin, label: "Service area", value: site.contact.serviceArea },
    { icon: Clock, label: "Business hours", value: site.contact.hours },
  ];
  return (
    <section aria-label="Contact details and online enquiry" className="bg-surface py-16 sm:py-20 lg:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-14">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="text-[1.6rem] font-bold">{contactCopy.details.title}</h2>
          <ul className="mt-6 space-y-3">
            {rows.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-center gap-4 rounded-xl border border-line bg-white px-4 py-3.5">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy-50">
                  <Icon className="size-[1.15rem] text-navy-800" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted">{label}</span>
                  <span className={value === TBC ? "text-muted italic" : "font-semibold text-ink"}>
                    {value === TBC ? "[To Be Confirmed]" : value}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div id="enquiry" className="scroll-mt-28">
          <Suspense fallback={<div className="h-[52rem] rounded-2xl border border-line bg-white shadow-card" aria-hidden />}>
            <QuoteEnquiryForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
