"use client";

import { Check, Copy, ExternalLink, MessagesSquare, X } from "lucide-react";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { socialChannels, type SocialChannel } from "@/data/site";
import { channelIcon, channelLabel, channelNote, channelTarget } from "@/components/social/SocialIcons";
import { useDict } from "@/components/locale/LocaleComponents";
import { cn } from "@/lib/cn";
import { fmt } from "@/i18n";

/** Hex colour → rgba with alpha (balls are slightly translucent, frosted). */
const tint = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/** Desktop = a fine pointer with hover. There, tel:/mailto: need another app, so balls open an info card first. */
const DESKTOP_QUERY = "(hover: hover) and (pointer: fine)";
function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(DESKTOP_QUERY);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const t = document.createElement("textarea");
    t.value = text;
    t.style.position = "fixed";
    t.style.opacity = "0";
    document.body.appendChild(t);
    t.select();
    const ok = document.execCommand("copy");
    t.remove();
    return ok;
  }
}

/** Desktop info card: the details as text, an "open" button, and copy. */
function ChannelCard({ ch, onClose }: { ch: SocialChannel; onClose: () => void }) {
  const { ui } = useDict();
  const [copied, setCopied] = useState(false);
  const href = channelTarget(ch);
  const external = href?.startsWith("http");
  // What gets copied: the RedNote ID for RedNote, otherwise the number / address itself.
  const copyValue = ch.id === "rednote" ? ch.handle : ch.value;
  const copyLabel = ch.id === "rednote" ? ui.social.copyId : ui.social.copy;
  return (
    <div className="w-80 rounded-2xl border border-white/70 bg-white/95 p-4 text-left shadow-lift backdrop-blur-md">
      <div className="flex items-start gap-3">
        <span
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: ch.color, color: ch.ink ?? "#fff" }}
        >
          {channelIcon(ch.id, "size-5")}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold tracking-[0.08em] text-muted uppercase">{channelLabel(ch, ui)}</p>
          {ch.value ? (
            <p className="mt-0.5 text-[0.98rem] font-bold [overflow-wrap:anywhere] text-ink select-all">{ch.value}</p>
          ) : (
            <p className="mt-0.5 text-sm text-muted">{channelNote(ch, ui)}</p>
          )}
          {ch.handle && <p className="mt-0.5 text-sm text-muted select-all">{fmt(ui.social.rednoteId, { id: ch.handle })}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={ui.social.closeCard}
          className="-mt-1 -mr-1 rounded-full p-1 text-muted transition-colors hover:bg-navy-50 hover:text-ink"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
      <div className="mt-4 flex gap-2">
        {href && (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold whitespace-nowrap transition-[filter] hover:brightness-110"
            style={{ backgroundColor: ch.color, color: ch.ink ?? "#fff" }}
          >
            {ui.social.actions[ch.id]}
            {external && <ExternalLink className="size-3.5" aria-hidden />}
            {external && <span className="sr-only">{ui.social.newTab}</span>}
          </a>
        )}
        {copyValue && (
          <button
            type="button"
            onClick={async () => {
              if (await copyText(copyValue)) {
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1800);
              }
            }}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-line whitespace-nowrap bg-white px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-navy-50"
          >
            {copied ? <Check className="size-4 text-green-600" aria-hidden /> : <Copy className="size-4" aria-hidden />}
            {copied ? ui.social.copied : copyLabel}
          </button>
        )}
      </div>
      <p role="status" className="sr-only">
        {copied ? ui.social.copied : ""}
      </p>
    </div>
  );
}

/**
 * Floating contact & social button (all pages).
 * Frosted, semi-transparent main button with the rainbow ring; channels pop out one by one
 * with a soft spring and collapse in reverse.
 * Phones/tablets: a ball opens the app directly (call, email, RedNote).
 * Desktop: a ball opens a small card showing the details, with "open" and "copy" buttons.
 */
export function SocialFab() {
  const [open, setOpen] = useState(false);
  const { ui } = useDict();
  const [note, setNote] = useState<SocialChannel | null>(null);
  const desktop = useIsDesktop();
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
      <div className="relative">
      <div
        className={cn(
          "absolute right-full bottom-0 mr-3 origin-bottom-right transition-[opacity,transform] duration-200",
          note && open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
      >
        {note && <ChannelCard key={note.id} ch={note} onClose={() => setNote(null)} />}
      </div>
      <ul id={panelId} aria-label={ui.social.listLabel} className={cn("mb-3 flex flex-col items-end gap-2", !open && "pointer-events-none")}>
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
          const label = note ? null : (
            <span className="rounded-full bg-navy-950/80 px-3 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              {channelLabel(ch, ui)}
            </span>
          );
          return (
            <li
              key={ch.id}
             
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0) scale(1)" : "translateY(14px) scale(0.55)",
                transition: `opacity 240ms ease ${delay}ms, transform 420ms ${SPRING} ${delay}ms`,
              }}
            >
              {href && !desktop ? (
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  tabIndex={open ? 0 : -1}
                  className="group flex items-center gap-2 rounded-full"
                  aria-label={external ? `${channelLabel(ch, ui)} ${ui.social.newTab}` : channelLabel(ch, ui)}
                >
                  {label}
                  {ball}
                </a>
              ) : (
                <button
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={() => setNote((v) => (v?.id === ch.id ? null : ch))}
                  className={cn("group flex items-center gap-2 rounded-full", note?.id === ch.id && "[&>span:last-child]:ring-2 [&>span:last-child]:ring-navy-900/40")}
                  aria-expanded={note?.id === ch.id}
                  aria-label={href ? channelLabel(ch, ui) : `${channelLabel(ch, ui)} – ${ui.social.detailsComingSoon}`}
                >
                  {label}
                  {ball}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      </div>

      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          setNote(null);
        }}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? ui.social.fabClose : ui.social.fabOpen}
        className="group relative inline-flex size-14 items-center justify-center rounded-full bg-white/45 shadow-[0_10px_30px_-8px_rgb(3_34_79/0.5)] backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 active:scale-90"
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
