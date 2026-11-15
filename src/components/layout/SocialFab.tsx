"use client";

import { MessagesSquare, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { socialChannels, type SocialChannel } from "@/data/site";
import { channelIcon, channelNote, channelTarget } from "@/components/social/SocialIcons";
import { cn } from "@/lib/cn";

/** Hex colour → rgba with alpha (balls are slightly translucent, frosted). */
const tint = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/**
 * Floating contact & social button (all pages).
 * Frosted, semi-transparent main button with the rainbow ring; channels pop out one by one
 * with a soft spring and collapse in reverse. Linked channels open in a new tab.
 */
export function SocialFab() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState<SocialChannel | null>(null);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const n = socialChannels.length;

  useEffect(() => {
    if (!open) return;
    const close = () => {
      setOpen(false);
      setNote(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fixed right-4 bottom-4 z-40 flex flex-col items-end sm:right-6 sm:bottom-6">
      <div
        role="status"
        className={cn(
          "mb-3 max-w-[16rem] origin-bottom-right rounded-xl border border-white/60 bg-white/90 px-4 py-3 text-sm shadow-lift backdrop-blur-md transition-[opacity,transform] duration-200",
          note && open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
      >
        {note && (
          <>
            <p className="font-semibold text-ink">{note.label}</p>
            <p className="mt-0.5 text-muted">{channelNote(note)}</p>
          </>
        )}
      </div>

      <ul id={panelId} aria-label="Contact Rainbow Air and follow us" className={cn("mb-3 flex flex-col items-end gap-2", !open && "pointer-events-none")}>
        {socialChannels.map((ch, i) => {
          const href = channelTarget(ch);
          const external = href?.startsWith("http");
          // Open: bottom item first; close: top item first (reverse).
          const delay = open ? (n - 1 - i) * 38 : i * 22;
          const ball = (
            <span
              className="inline-flex size-11 items-center justify-center rounded-full shadow-[0_8px_22px_-8px_rgb(0_0_0/0.45)] ring-1 ring-white/70 backdrop-blur-md transition-transform duration-200 group-hover:scale-110 group-active:scale-95 sm:size-12"
              style={{ backgroundColor: tint(ch.color, 0.88), color: ch.ink ?? "#fff" }}
            >
              {channelIcon(ch.id)}
            </span>
          );
          const label = (
            <span className="rounded-full bg-navy-950/80 px-3 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              {ch.label}
            </span>
          );
          return (
            <li
              key={ch.id}
              className="motion-reduce:!transition-none"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0) scale(1)" : "translateY(14px) scale(0.55)",
                transition: `opacity 240ms ease ${delay}ms, transform 420ms ${SPRING} ${delay}ms`,
              }}
            >
              {href ? (
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  tabIndex={open ? 0 : -1}
                  className="group flex items-center gap-2 rounded-full"
                  aria-label={external ? `${ch.label} (opens in a new tab)` : ch.label}
                >
                  {label}
                  {ball}
                </a>
              ) : (
                <button
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={() => setNote((v) => (v?.id === ch.id ? null : ch))}
                  className="group flex items-center gap-2 rounded-full"
                  aria-label={`${ch.label} – details coming soon`}
                >
                  {label}
                  {ball}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          setNote(null);
        }}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close contact options" : "Contact Rainbow Air or follow us"}
        className="group relative inline-flex size-14 items-center justify-center rounded-full bg-white/45 shadow-[0_10px_30px_-8px_rgb(3_34_79/0.5)] backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 active:scale-90 motion-reduce:transition-none"
      >
        {/* Rainbow ring echoing the logo arc */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full p-[3px] [background:conic-gradient(from_200deg,#e8231b,#f7801e,#fbd40a,#3cb44a,#12a0dc,#1450b4,#4a3aa8,#e8231b)] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]"
        />
        <MessagesSquare
          aria-hidden
          className={cn(
            "absolute size-6 text-navy-900 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            open ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
          )}
        />
        <X
          aria-hidden
          className={cn(
            "absolute size-6 text-navy-900 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            open ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0",
          )}
        />
      </button>
    </div>
  );
}
