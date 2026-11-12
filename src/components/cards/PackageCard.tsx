"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { InstallPackage } from "@/data/types";
import { useQuote } from "@/context/QuoteContext";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { cn } from "@/lib/cn";

export function PackageCard({ pkg, featured = false }: { pkg: InstallPackage; featured?: boolean }) {
  const { requestQuote } = useQuote();
  const headingId = `pkg-${pkg.id}`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:shadow-lift",
        featured ? "border-navy-900/25 shadow-card" : "border-line shadow-card",
      )}
    >
      {featured && <div aria-hidden className="rb-full absolute inset-x-0 top-0 z-10 h-1" />}
      <div className="relative aspect-[4/3] bg-gradient-to-b from-surface to-navy-50">
        <SmartImage
          image={pkg.image}
          fit="contain"
          sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw"
          className="p-10 transition-transform duration-500 group-hover/card:scale-[1.03]"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-navy-900 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-white">{pkg.label}</span>
        </div>
        <DemoBadge className="absolute top-4 right-4">Demo package</DemoBadge>
        <p className="absolute inset-x-0 bottom-0 px-4 pb-3 text-center text-[0.72rem] text-muted">{pkg.imageCaption}</p>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-sm font-semibold text-sky-600">{pkg.systemType}</p>
        <h3 id={headingId} className="mt-1.5 text-2xl font-bold tracking-[-0.01em]">
          {pkg.name}
        </h3>
        <p className="mt-2 leading-relaxed text-body">{pkg.tagline}</p>

        <dl className="mt-5 divide-y divide-line rounded-xl border border-line bg-surface/60 text-sm">
          <div className="flex justify-between gap-4 px-4 py-2.5">
            <dt className="text-muted">Suitable for</dt>
            <dd className="text-right font-semibold text-ink">{pkg.suitableFor}</dd>
          </div>
          {pkg.highlights.map((h) => (
            <div key={h.label} className="flex justify-between gap-4 px-4 py-2.5">
              <dt className="text-muted">{h.label}</dt>
              <dd className="text-right font-semibold text-ink">{h.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy-700">Installation scope</p>
          <ul className="mt-3 space-y-2 text-[0.95rem]">
            {pkg.installScope.map((item) => (
              <li key={item} className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 size-[1.05rem] shrink-0 text-rb-green" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-7">
          <div className="mb-4 flex items-baseline justify-between border-t border-line pt-5">
            <span className="text-sm text-muted">Pricing</span>
            <span className="font-display text-lg font-bold text-navy-900">{pkg.price ?? "Request a Quote"}</span>
          </div>
          <Button
            className="w-full"
            variant={featured ? "primary" : "secondary"}
            onClick={() =>
              requestQuote({ enquiryType: "Package / Product Quote", preferred: `${pkg.label}: ${pkg.name} (${pkg.systemType})` })
            }
            aria-label={`Get a package quote for ${pkg.name}`}
          >
            Get a Package Quote
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Button>
        </div>
      </div>
    </article>
  );
}
