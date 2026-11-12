import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  as?: "div" | "li" | "article";
}

/**
 * Gentle fade/slide-in on scroll.
 *
 * Content is fully visible in the pre-rendered HTML (good for SEO and no-JS).
 * Only when JS is running (`html.js`, set in layout) is it hidden until
 * <RevealObserver> marks it visible. Disabled for prefers-reduced-motion in CSS.
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;
  return (
    <Tag data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}
