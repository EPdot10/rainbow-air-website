import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { veuStrip } from "@/data/content";
import { routes } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * VEU highlight card linking to the VEU section of the Installation page.
 * No discount amounts or eligibility promises.
 *  - `stacked`: used inside the home hero on large screens (visible on the first screen).
 *  - `row`: used directly under the hero on smaller screens.
 */
export function VeuCard({ layout = "row", className }: { layout?: "row" | "stacked"; className?: string }) {
  const stacked = layout === "stacked";
  return (
    <Link
      href={`${routes.installation}#veu`}
      className={cn(
        "group relative flex overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-lift transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 sm:p-7",
        stacked ? "flex-col gap-4" : "flex-col gap-5 md:flex-row md:items-center md:gap-7",
        className,
      )}
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-rb-green via-rb-sky to-rb-blue" />
      <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 ring-1 ring-rb-green/20">
        <Leaf className="size-7 text-rb-green" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="flex-1">
        <span className="block text-[0.75rem] font-bold uppercase tracking-[0.16em] text-rb-green">{veuStrip.eyebrow}</span>
        <span className="mt-1.5 block font-display text-[1.3rem] leading-snug font-bold text-ink sm:text-[1.4rem]">{veuStrip.title}</span>
        <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-muted">{veuStrip.body}</span>
      </span>
      <span
        className={cn(
          "inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-navy-900 px-5 font-semibold whitespace-nowrap text-white transition-colors group-hover:bg-navy-800",
          stacked ? "self-stretch" : "self-start md:self-center",
        )}
      >
        {veuStrip.cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

/** Below-hero placement for screens narrower than lg (on lg+ the card sits inside the hero). */
export function VeuStrip() {
  return (
    <section
      aria-label={veuStrip.eyebrow}
      className="relative z-10 -mt-10 bg-[linear-gradient(to_bottom,transparent_2.5rem,var(--color-surface)_2.5rem)] sm:-mt-14 sm:bg-[linear-gradient(to_bottom,transparent_3.5rem,var(--color-surface)_3.5rem)] lg:hidden"
    >
      <div className="container-page">
        <VeuCard />
      </div>
    </section>
  );
}
