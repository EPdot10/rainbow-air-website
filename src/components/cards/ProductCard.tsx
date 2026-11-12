"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, ExternalLink, FileText, Flame, Home, ShieldCheck, Snowflake, X } from "lucide-react";
import type { Product } from "@/data/types";
import { TBC } from "@/data/types";
import { productQuoteLabel } from "@/data/products";
import { quoteHref } from "@/lib/quote";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button, ButtonLink } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { cn } from "@/lib/cn";

function Capacity({ icon: Icon, label, value, tone }: { icon: typeof Flame; label: string; value: string; tone: "cool" | "warm" }) {
  const pending = value === TBC;
  return (
    <div className="rounded-xl border border-line bg-white px-3.5 py-3">
      <dt className="flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">
        <Icon className={cn("size-3.5", tone === "cool" ? "text-rb-sky" : "text-rb-orange")} aria-hidden />
        {label}
      </dt>
      <dd className={cn("mt-1 font-display font-bold", pending ? "text-[0.95rem] text-muted" : "text-xl text-navy-900")}>{value}</dd>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const headingId = `prod-${product.id}`;
  const quote = quoteHref({ type: "package", item: productQuoteLabel(product) });

  return (
    <article
      aria-labelledby={headingId}
      className="group/card flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] bg-[radial-gradient(ellipse_at_center,#ffffff_0%,var(--color-surface)_70%)]">
        <SmartImage
          image={product.image}
          fit="contain"
          sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw"
          className="p-8 transition-transform duration-500 group-hover/card:scale-[1.04]"
        />
        <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy-800 ring-1 ring-line">
          {product.systemType}
        </span>
        <DemoBadge className="absolute top-4 right-4">{`Demo · ${product.brand}`}</DemoBadge>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold text-muted">
          {product.brand} · {product.series}
        </p>
        <h3 id={headingId} className="mt-1 font-display text-[1.3rem] leading-snug font-bold break-words">
          {product.model}
        </h3>

        <dl className="mt-4 grid grid-cols-2 gap-2.5">
          <Capacity icon={Snowflake} tone="cool" label="Rated cooling" value={product.ratedCooling} />
          <Capacity icon={Flame} tone="warm" label="Rated heating" value={product.ratedHeating} />
        </dl>
        {product.capacityNote && <p className="mt-2.5 text-[0.82rem] text-muted">{product.capacityNote}</p>}

        <dl className="mt-4 space-y-1.5 text-[0.88rem]">
          <div className="flex gap-2">
            <dt className="flex shrink-0 items-center gap-1.5 text-muted">
              <Home className="size-3.5" aria-hidden />
              Suitable for:
            </dt>
            <dd className="text-ink">{product.suitableFor}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="flex shrink-0 items-center gap-1.5 text-muted">
              <ShieldCheck className="size-3.5" aria-hidden />
              Warranty:
            </dt>
            <dd className={product.warranty === TBC ? "italic text-muted" : "text-ink"}>{product.warranty}</dd>
          </div>
        </dl>

        <ul className="mt-4 space-y-1.5 text-[0.93rem]" aria-label="Key features">
          {product.keyFeatures.map((f) => (
            <li key={f} className="flex gap-2.5">
              <span aria-hidden className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-sky-500" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col-reverse gap-2.5 pt-6">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button variant="outline" size="sm" className="w-full" aria-label={`View specifications for ${product.model}`}>
                <FileText className="size-4" aria-hidden />
                View Specifications
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-navy-950/55 backdrop-blur-[2px] data-[state=open]:animate-fade-in" />
              <Dialog.Content className="fixed top-1/2 left-1/2 z-50 flex max-h-[min(44rem,90svh)] w-[min(40rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl outline-none data-[state=open]:animate-fade-in">
                <div className="flex items-start justify-between gap-4 border-b border-line p-6">
                  <div>
                    <p className="text-sm font-semibold text-muted">
                      {product.brand} · {product.series} · {product.systemType}
                    </p>
                    <Dialog.Title className="mt-1 font-display text-xl font-bold text-navy-900">{product.model}</Dialog.Title>
                  </div>
                  <Dialog.Close
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-navy-900 hover:bg-navy-50"
                    aria-label="Close specifications"
                  >
                    <X className="size-5" aria-hidden />
                  </Dialog.Close>
                </div>
                <div className="overflow-y-auto p-6">
                  <Dialog.Description className="rounded-lg bg-flame-50 px-4 py-3 text-sm leading-relaxed text-flame-700">
                    Demo reference data published by {product.brand} Australia, shown for layout preview only. Not a Rainbow Air
                    model. Figures marked “{TBC}” are not stated as rated values by the source.
                  </Dialog.Description>
                  <table className="mt-5 w-full text-sm">
                    <caption className="sr-only">Specifications for {product.model}</caption>
                    <tbody className="divide-y divide-line">
                      {[...product.specs, { label: "Equipment warranty", value: product.warranty }].map((s) => (
                        <tr key={s.label}>
                          <th scope="row" className="py-2.5 pr-4 text-left font-medium text-muted">
                            {s.label}
                          </th>
                          <td className={cn("py-2.5 text-right font-semibold", s.value === TBC ? "text-muted italic" : "text-ink")}>
                            {s.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-5 text-xs text-muted">
                    Source:{" "}
                    <a
                      href={product.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-sky-600 hover:underline"
                    >
                      {product.sourceUrl.replace("https://", "")}
                      <ExternalLink className="size-3" aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>{" "}
                    · accessed {product.sourceAccessed}
                  </p>
                </div>
                <div className="border-t border-line bg-surface p-4 sm:px-6">
                  <ButtonLink href={quote} className="w-full">
                    Get an Installed Quote
                    <ArrowRight className="size-4" aria-hidden />
                  </ButtonLink>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <ButtonLink href={quote} size="sm" className="w-full" aria-label={`Get an installed quote for ${product.model}`}>
            Get an Installed Quote
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
