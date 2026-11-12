import { ArrowRight, BadgeCheck, FileText, Wrench } from "lucide-react";
import { aboutCopy } from "@/data/content";
import { site } from "@/data/site";
import { TBC } from "@/data/types";
import { quoteHref } from "@/lib/quote";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function Pending({ value }: { value: string }) {
  return value === TBC ? <span className="italic text-muted">[To Be Confirmed]</span> : <span className="font-semibold text-ink">{value}</span>;
}

/** Company details – all To Be Confirmed until Rainbow Air supplies them. */
export function CompanyInfo() {
  const rows = [
    { label: "Legal business name", value: site.company.legalName },
    { label: "ABN", value: site.company.abn },
    { label: "Licences & how to verify", value: site.company.licence },
    { label: "Insurance", value: site.company.insurance },
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

export function Aftercare() {
  const c = aboutCopy.aftercare;
  return (
    <section id="aftercare" aria-labelledby="aftercare-title" className="py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <SectionHeading id="aftercare-title" eyebrow={c.eyebrow} title={c.title} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Reveal className="rounded-2xl border border-line bg-white p-7 shadow-card">
            <FileText className="size-7 text-rb-sky" strokeWidth={1.75} aria-hidden />
            <h3 className="mt-4 text-lg font-bold">Equipment warranty</h3>
            <p className="mt-2 leading-relaxed">{c.equipment}</p>
          </Reveal>
          <Reveal delay={0.06} className="rounded-2xl border border-line bg-white p-7 shadow-card">
            <Wrench className="size-7 text-rb-orange" strokeWidth={1.75} aria-hidden />
            <h3 className="mt-4 text-lg font-bold">{c.workmanshipLabel}</h3>
            <p className="mt-2 leading-relaxed">
              Period, coverage and terms: <Pending value={c.workmanship} />
            </p>
          </Reveal>
          <Reveal delay={0.12} className="flex flex-col rounded-2xl border border-navy-900/15 bg-navy-50 p-7 shadow-card">
            <h3 className="text-lg font-bold">Need help after installation?</h3>
            <p className="mt-2 leading-relaxed">{c.howTo}</p>
            <ButtonLink href={quoteHref({ type: "aftercare" })} variant="secondary" className="mt-6 self-start">
              {c.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
