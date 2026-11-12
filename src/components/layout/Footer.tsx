import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { footerQuickLinks, site } from "@/data/site";
import { TBC } from "@/data/types";
import { cn } from "@/lib/cn";

function Value({ children }: { children: string }) {
  const pending = children === TBC;
  return <span className={cn(pending && "italic text-white/50")}>{pending ? "[To Be Confirmed]" : children}</span>;
}

export function Footer() {
  const contactRows = [
    { icon: Phone, label: "Phone", value: site.contact.phone },
    { icon: Mail, label: "Email", value: site.contact.email },
    { icon: MapPin, label: "Service Area", value: site.contact.serviceArea },
    { icon: Clock, label: "Business Hours", value: site.contact.hours },
  ];
  const companyRows = [
    { label: "Legal Business Name", value: site.company.legalName },
    { label: "ABN", value: site.company.abn },
    { label: "Licence Details", value: site.company.licence },
  ];

  return (
    <footer className="relative bg-navy-950 text-white/80" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div aria-hidden className="rb-full h-1 w-full" />
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr] lg:gap-10">
        <div>
          <img
            src={site.logo.reversedSrc}
            alt={site.logo.alt}
            width={site.logo.width}
            height={site.logo.height}
            loading="lazy"
            className="h-14 w-auto"
          />
          <p className="mt-5 font-display text-lg font-semibold text-white">{site.slogan}</p>
          <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-white/65">{site.intro}</p>
        </div>

        <nav aria-label="Quick links">
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Quick Links</h3>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {footerQuickLinks.map((link) => (
              <li key={link.label}>
                {link.comingSoon || !link.href ? (
                  <span className="inline-flex items-center gap-2 text-white/45" aria-disabled="true">
                    {link.label}
                    <span className="rounded-full border border-white/15 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider">
                      Coming soon
                    </span>
                  </span>
                ) : (
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Contact Details</h3>
          <ul className="mt-5 space-y-3.5 text-[0.95rem]">
            {contactRows.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex gap-3">
                <Icon className="mt-0.5 size-4 shrink-0 text-rb-sky" aria-hidden />
                <span>
                  <span className="sr-only">{label}: </span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-white/45" aria-hidden>
                    {label}
                  </span>
                  <Value>{value}</Value>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Company Information</h3>
          <dl className="mt-5 space-y-3.5 text-[0.95rem]">
            {companyRows.map((row) => (
              <div key={row.label}>
                <dt className="text-xs font-semibold uppercase tracking-wider text-white/45">{row.label}</dt>
                <dd>
                  <Value>{row.value}</Value>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.copyrightYear} Rainbow Air. All rights reserved.</p>
          <p>Demo website – content, imagery and product data are placeholders pending confirmation.</p>
        </div>
      </div>
    </footer>
  );
}
