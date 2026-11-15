"use client";

import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { routes, site, telHref } from "@/data/site";
import { fmt } from "@/i18n";
import { TBC } from "@/data/types";
import { cn } from "@/lib/cn";
import { LocalizedLink, useDict } from "@/components/locale/LocaleComponents";
import { SocialRow } from "@/components/social/SocialIcons";

function Value({ children }: { children: string }) {
  const pending = children === TBC;
  return <span className={cn(pending && "italic text-white/50")}>{pending ? "[To Be Confirmed]" : children}</span>;
}

export function Footer() {
  const { ui } = useDict();
  const f = ui.footer;
  const quickLinks = [
    { label: f.aboutUs, href: routes.about },
    { label: f.privacy, href: routes.privacy },
    { label: f.terms, href: routes.terms },
    { label: f.quickEnquiry, href: `${routes.contact}#enquiry` },
  ];
  const contactRows = [
    { icon: Phone, label: f.phone, value: site.contact.phone as string, href: telHref(site.contact.phone) },
    { icon: Mail, label: f.email, value: site.contact.email as string, href: `mailto:${site.contact.email}` },
    { icon: MapPin, label: f.serviceArea, value: ui.site.serviceArea },
    { icon: Clock, label: f.hours, value: site.contact.hours as string },
  ].filter((r) => r.value !== TBC);
  const companyRows = [
    { label: f.legalName, value: site.company.legalName },
    { label: f.acn, value: site.company.acn },
    { label: f.abn, value: site.company.abn },
  ];

  return (
    <footer className="relative bg-navy-950 text-white/80" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        {f.heading}
      </h2>
      <div aria-hidden className="rb-full h-1 w-full" />
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1.2fr] lg:gap-10">
        <div>
          <img
            src={site.logo.reversedSrc}
            alt={ui.common.logoAlt}
            width={site.logo.width}
            height={site.logo.height}
            className="h-14 w-auto"
          />
          <p className="mt-5 font-display text-lg font-semibold text-white">{site.slogan}</p>
          <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-white/65">{ui.site.intro}</p>
          <SocialRow size="sm" tone="light" className="mt-6" />
        </div>

        <nav aria-label={f.quickLinks}>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">{f.quickLinks}</h3>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {quickLinks.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <LocalizedLink href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </LocalizedLink>
                ) : (
                  <span className="text-white/45">{link.label}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">{f.contactUs}</h3>
          <ul className="mt-5 space-y-3.5 text-[0.95rem]">
            {contactRows.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex gap-3">
                <Icon className="mt-0.5 size-4 shrink-0 text-rb-sky" aria-hidden />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-white/45">{label}</span>
                  {href && value !== TBC ? (
                    <a href={href} className="break-words hover:text-white">
                      {value}
                    </a>
                  ) : (
                    <Value>{value}</Value>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <LocalizedLink
            href={`${routes.contact}#enquiry`}
            className="group mt-6 inline-flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10"
          >
            {f.onlineEnquiry}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </LocalizedLink>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">{f.companyInfo}</h3>
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
          <p>
            © {site.copyrightYear} {fmt(f.copyright, { legalName: site.company.legalName })}
          </p>
        </div>
      </div>
    </footer>
  );
}
