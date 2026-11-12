import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost-light" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-[0.005em] transition-[background-color,color,box-shadow,transform,border-color] duration-200 select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-flame-600 text-white shadow-[0_6px_16px_-6px_rgb(194_65_12/0.55)] hover:bg-flame-700 hover:shadow-[0_10px_22px_-8px_rgb(194_65_12/0.6)]",
  secondary: "bg-navy-900 text-white hover:bg-navy-800 shadow-[0_6px_16px_-8px_rgb(3_34_79/0.5)]",
  outline: "border border-navy-900/20 bg-white text-navy-900 hover:border-navy-900/45 hover:bg-navy-50",
  "ghost-light": "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/70",
  link: "px-0! py-0! text-sky-600 hover:text-navy-900 underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </a>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
