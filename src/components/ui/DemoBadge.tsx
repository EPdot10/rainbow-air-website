import { cn } from "@/lib/cn";

/** Small, unobtrusive label marking demo / illustrative content. */
export function DemoBadge({ children = "Demo data", className, tone = "light" }: { children?: string; className?: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em]",
        tone === "light" ? "bg-white/90 text-navy-800 ring-1 ring-navy-900/10 backdrop-blur" : "bg-navy-950/65 text-white backdrop-blur",
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-rb-orange" />
      {children}
    </span>
  );
}
