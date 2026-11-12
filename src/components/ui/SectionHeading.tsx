import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  id?: string;
  className?: string;
}

/** Eyebrow uses the logo's warm/cool dash motif. */
export function Eyebrow({ children, tone = "dark", center = false }: { children: string; tone?: "dark" | "light"; center?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.78rem] font-bold uppercase tracking-[0.18em]",
        tone === "dark" ? "text-navy-700" : "text-white/85",
        center && "justify-center",
      )}
    >
      <span aria-hidden className="rb-warm h-[3px] w-7 rounded-full" />
      {children}
      {center && <span aria-hidden className="rb-cool h-[3px] w-7 rounded-full" />}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, align = "left", tone = "dark", id, className }: SectionHeadingProps) {
  const center = align === "center";
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center", className)}>
      <Eyebrow tone={tone} center={center}>
        {eyebrow}
      </Eyebrow>
      <h2
        id={id}
        className={cn(
          "mt-4 text-[2rem] leading-[1.12] font-bold tracking-[-0.02em] sm:text-[2.5rem] lg:text-[2.85rem]",
          tone === "light" && "text-white",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg leading-relaxed", tone === "dark" ? "text-muted" : "text-white/80")}>{subtitle}</p>
      )}
    </Reveal>
  );
}
