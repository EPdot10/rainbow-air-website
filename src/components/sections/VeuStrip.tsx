import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { veuStrip } from "@/data/content";
import { routes } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * VEU highlight card, shown inside the home hero on every screen size.
 * Dark frosted-glass style so it sits naturally on the hero photo instead of
 * a stark white box. Links to the VEU section of the Installation page.
 * No discount amounts or eligibility promises.
 */
export function VeuCard({ className }: { className?: string }) {
  return (
    <Link
      href={`${routes.installation}#veu`}
      className={cn(
        "group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/15 bg-navy-950/55 p-6 text-white shadow-[0_24px_60px_-24px_rgb(0_0_0/0.6)] backdrop-blur-md transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-navy-950/65 sm:p-7",
        className,
      )}
    >
      {/* Rainbow edge – green → sky → blue, echoing the logo arc */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-rb-green via-rb-sky to-rb-blue" />
      <span className="flex items-center gap-3">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-rb-green/15 ring-1 ring-rb-green/40">
          <Leaf className="size-[1.35rem] text-[#7ddb88]" strokeWidth={1.9} aria-hidden />
        </span>
        <span className="text-[0.72rem] leading-snug font-bold uppercase tracking-[0.16em] text-[#7ddb88]">{veuStrip.eyebrow}</span>
      </span>
      <span className="block font-display text-[1.25rem] leading-snug font-bold sm:text-[1.35rem]">{veuStrip.title}</span>
      <span className="block text-[0.93rem] leading-relaxed text-white/72">{veuStrip.body}</span>
      <span className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 font-semibold whitespace-nowrap text-navy-900 transition-colors group-hover:bg-sky-50">
        {veuStrip.cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
