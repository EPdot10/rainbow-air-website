import { getDict } from "@/i18n/server";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site, telHref } from "@/data/site";
import { TBC } from "@/data/types";
import { QuoteEnquiryForm } from "@/components/forms/QuoteEnquiryForm";
import { SocialRow } from "@/components/social/SocialIcons";

/** Contact details + the online enquiry form (#enquiry). On mobile the form comes first. */
export function ContactSection() {
  const { contactCopy } = getDict().c;
  const { ui } = getDict();
  const rows = [
    { icon: Phone, label: ui.contact.phone, value: site.contact.phone, href: telHref(site.contact.phone) },
    { icon: Mail, label: ui.contact.email, value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: MapPin, label: ui.contact.serviceArea, value: ui.site.serviceArea },
    { icon: Clock, label: ui.contact.hours, value: site.contact.hours },
  ].filter((r) => (r.value as string) !== TBC);
  return (
    <section aria-label={ui.contact.sectionLabel} className="bg-surface py-8 sm:py-12 lg:py-14">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-14">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="text-[1.6rem] font-bold">{contactCopy.details.title}</h2>
          <ul className="mt-6 space-y-3">
            {rows.map(({ icon: Icon, label, value, href }) => {
              const pending = value === TBC;
              const inner = (
                <>
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy-50">
                    <Icon className="size-[1.15rem] text-navy-800" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted">{label}</span>
                    <span className={pending ? "text-muted italic" : "font-semibold break-words text-ink"}>
                      {pending ? "[To Be Confirmed]" : value}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href && !pending ? (
                    <a href={href} className="flex items-center gap-4 rounded-xl border border-line bg-white px-4 py-3.5 transition-colors hover:border-navy-900/30">
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-xl border border-line bg-white px-4 py-3.5">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <h3 className="mt-8 text-sm font-bold uppercase tracking-[0.12em] text-navy-700">{contactCopy.social.title}</h3>
          <SocialRow size="sm" className="mt-3" />
        </div>

        <div id="enquiry" className="order-first scroll-mt-6 lg:order-none">
          <QuoteEnquiryForm />
        </div>
      </div>
    </section>
  );
}
