"use client";

import { Camera, ExternalLink, MessageCircle, Share2, ThumbsUp, X, BookHeart } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { socialChannels, type SocialChannel } from "@/data/site";
import { TBC } from "@/data/types";
import { cn } from "@/lib/cn";

/** Generic icons (no brand marks) – the label names each channel. */
const icons: Record<SocialChannel["id"], typeof Camera> = {
  xiaohongshu: BookHeart,
  instagram: Camera,
  wechat: MessageCircle,
  facebook: ThumbsUp,
};

/**
 * Floating social button. Opens a stack of rainbow-coloured balls linking to
 * Rainbow Air's Xiaohongshu, Instagram, WeChat and Facebook.
 * Channels without a confirmed account show a small "coming soon" note instead of a link.
 */
export function SocialFab() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState<SocialChannel | null>(null);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setNote(null);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setNote(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fixed right-4 bottom-4 z-40 flex flex-col items-end sm:right-6 sm:bottom-6">
      {note && open && (
        <div
          role="status"
          className="mb-3 max-w-[15rem] rounded-xl border border-line bg-white px-4 py-3 text-sm shadow-lift data-[state=open]:animate-fade-in"
        >
          <p className="font-semibold text-ink">{note.label}</p>
          <p className="mt-0.5 text-muted">
            {note.handle && note.handle !== TBC ? `WeChat ID: ${note.handle}` : "Account details coming soon."}
          </p>
        </div>
      )}

      <ul
        id={panelId}
        aria-label="Rainbow Air social channels"
        className={cn(
          "mb-3 flex flex-col items-end gap-2.5 transition-[opacity,transform] duration-300",
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        {socialChannels.map((ch, i) => {
          const Icon = icons[ch.id];
          const ball = (
            <span
              className="inline-flex size-12 items-center justify-center rounded-full text-white shadow-[0_8px_20px_-8px_rgb(0_0_0/0.45)] ring-2 ring-white transition-transform duration-200 group-hover:scale-110"
              style={{ backgroundColor: ch.color }}
            >
              <Icon className="size-5" aria-hidden />
            </span>
          );
          const label = (
            <span className="rounded-full bg-navy-950/85 px-3 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              {ch.label}
            </span>
          );
          return (
            <li key={ch.id} style={{ transitionDelay: open ? `${(socialChannels.length - i) * 30}ms` : "0ms" }}>
              {ch.href ? (
                <a
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={open ? 0 : -1}
                  className="group flex items-center gap-2 rounded-full"
                  aria-label={`${ch.label} (opens in a new tab)`}
                >
                  {label}
                  {ball}
                  <ExternalLink className="sr-only" aria-hidden />
                </a>
              ) : (
                <button
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={() => setNote((n) => (n?.id === ch.id ? null : ch))}
                  className="group flex items-center gap-2 rounded-full"
                  aria-label={`${ch.label} – account coming soon`}
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
        aria-label={open ? "Close social links" : "Follow Rainbow Air on social media"}
        className="relative inline-flex size-14 items-center justify-center rounded-full bg-white shadow-[0_10px_28px_-8px_rgb(3_34_79/0.55)] transition-transform duration-200 hover:scale-105"
      >
        {/* Rainbow ring echoing the logo arc */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full p-[3px] [background:conic-gradient(from_200deg,#e8231b,#f7801e,#fbd40a,#3cb44a,#12a0dc,#1450b4,#e8231b)] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]"
        />
        {open ? <X className="size-6 text-navy-900" aria-hidden /> : <Share2 className="size-6 text-navy-900" aria-hidden />}
      </button>
    </div>
  );
}
