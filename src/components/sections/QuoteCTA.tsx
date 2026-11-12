import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { sectionCopy } from "@/data/content";
import { site } from "@/data/site";
import { TBC } from "@/data/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteEnquiryForm } from "@/components/forms/QuoteEnquiryForm";

export function QuoteCTA() {
  const c = sectionCopy.quote;
  const rows = [
    { icon: Phone, label: "Phone", value: site.contact.phone },
    { icon: Mail, label: "Email", value: site.contact.email },
    { icon: MapPin, label: "Service area", value: site.contact.serviceArea },
    { icon: Clock, label: "Business hours", value: site.contact.hours },
  ];
  return (
    <section id="quote" aria-labelledby="quote-title" className="relative bg-surface py-20 sm:py-24 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">
        <div>
          <SectionHeading id="quote-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.body} />

          <ul className="mt-10 space-y-3">
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

        <QuoteEnquiryForm />
      </div>
    </section>
  );
}
