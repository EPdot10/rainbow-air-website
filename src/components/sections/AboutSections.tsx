import { AlertTriangle, ArrowRight, BadgeCheck, ClipboardList, Compass, ShieldCheck } from "lucide-react";
import { aboutCopy, aftercarePoints, companyHighlights } from "@/data/content";
import { site } from "@/data/site";
import { TBC } from "@/data/types";
import { quoteHref } from "@/lib/quote";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function Pending({ value }: { value: string }) {
  return value === TBC ? <span className="italic text-muted">[To Be Confirmed]</span> : <span className="font-semibold text-ink">{value}</span>;
}

/** Merged highlights block (client, 4 points). ⚠ First two to be substantiated before launch. */
export function CompanyHighlights() {
  return (
    <section aria-label="Company highlights" className="relative z-10 -mt-10 sm:-mt-12">
      <div className="container-page">
        <Reveal>
          <ul className="grid overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
            {companyHighlights.map((h, i) => (
              <li key={h.stat} className={`p-6 sm:p-7 ${i > 0 ? "border-t border-line sm:border-t-0 sm:border-l" : ""} ${i === 2 ? "sm:border-t lg:border-t-0" : ""} ${i === 3 ? "sm:border-t lg:border-t-0" : ""}`}>
                <p className="font-display text-[1.7rem] leading-none font-bold text-navy-900">{h.stat}</p>
                <span aria-hidden className="rb-full mt-3 block h-[3px] w-10 rounded-full" />
                <p className="mt-3 text-[0.97rem] leading-relaxed">{h.label}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Company details (legal name, ACN, ABN confirmed; licence/insurance pending). */
export function CompanyInfo() {
  const rows = [
    { label: "Legal business name", value: site.company.legalName },
    { label: "Trading name", value: site.name },
    { label: "ACN", value: site.company.acn },
    { label: "ABN", value: site.company.abn },
  ];
  return (
    <section aria-labelledby="company-title" className="py-20 sm:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        <Reveal>
          <h2 id="company-title" className="text-[2rem] leading-tight font-bold tracking-[-0.02em] sm:text-[2.4rem]">
            {aboutCopy.company.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{site.intro}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-card sm:grid-cols-2">
            {rows.map((r) => (
              <div key={r.label} className="bg-white p-5 sm:p-6">
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                  <BadgeCheck className="size-4 text-sky-600" aria-hidden />
                  {r.label}
                </dt>
                <dd className="mt-1.5">
                  <Pending value={r.value} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

const aftercareIcons = { shield: ShieldCheck, alert: AlertTriangle, compass: Compass, clipboard: ClipboardList } as const;

/** Client copy – "Equipment Warranty & Installation Aftercare" (4 points). */
export function Aftercare() {
  const c = aboutCopy.aftercare;
  return (
    <section id="aftercare" aria-labelledby="aftercare-title" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="aftercare-title" eyebrow={c.eyebrow} title={c.title} />
          <ButtonLink href={quoteHref({ type: "aftercare" })} variant="secondary" size="lg" className="shrink-0 self-start lg:self-end">
            {c.cta}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </ButtonLink>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aftercarePoints.map((p, i) => {
            const Icon = aftercareIcons[p.icon];
            return (
              <Reveal as="li" key={p.title} delay={i * 0.06} className="rounded-2xl border border-line bg-white p-7 shadow-card">
                <Icon className="size-7 text-rb-sky" strokeWidth={1.75} aria-hidden />
                <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 leading-relaxed">{p.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
