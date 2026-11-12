import { ExternalLink, Leaf } from "lucide-react";
import { veu } from "@/data/content";
import { TBC } from "@/data/types";
import { quoteHref } from "@/lib/quote";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * VEU discount block (Installation page). Information only – no eligibility tool,
 * no discount amounts and no accreditation claims until participation is confirmed.
 */
export function VeuSection() {
  return (
    <section id="veu" aria-labelledby="veu-title" className="py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-sky-50 via-white to-flame-50 p-8 shadow-card sm:p-12 lg:p-14">
          <div aria-hidden className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-rb-green via-rb-sky to-rb-blue" />
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <Eyebrow>{veu.eyebrow}</Eyebrow>
              <h2 id="veu-title" className="mt-4 text-[1.9rem] leading-tight font-bold tracking-[-0.02em] sm:text-[2.3rem]">
                {veu.title}
              </h2>
              <div className="mt-5 space-y-3 text-[1.03rem] leading-relaxed">
                {veu.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">
                Rainbow Air’s role and accredited provider details:{" "}
                <span className="italic">{veu.participation === TBC ? "[To Be Confirmed]" : veu.participation}</span>
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-stretch">
              <span className="hidden size-16 items-center justify-center rounded-2xl bg-white shadow-card ring-1 ring-line lg:inline-flex">
                <Leaf className="size-8 text-rb-green" strokeWidth={1.6} aria-hidden />
              </span>
              <ButtonLink href={quoteHref({ type: "veu", install: "replacement" })} size="lg" variant="secondary">
                {veu.cta}
              </ButtonLink>
              <a
                href={veu.officialInfo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 underline-offset-4 hover:underline"
              >
                {veu.officialInfo.label}
                <ExternalLink className="size-3.5" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
