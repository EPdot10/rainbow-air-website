"use client";

import { Mail, MessagesSquare, Phone, X } from "lucide-react";
import { siFacebook, siInstagram, siWechat, siWhatsapp, siXiaohongshu } from "simple-icons";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { socialChannels, type SocialChannel } from "@/data/site";
import { TBC } from "@/data/types";
import { cn } from "@/lib/cn";

/** Official platform glyphs from simple-icons (CC0), rendered single-colour. */
function BrandIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.35rem]" fill="currentColor" aria-hidden>
      <path d={path} />
    </svg>
  );
}

const icons: Record<SocialChannel["id"], ReactNode> = {
  xiaohongshu: <BrandIcon path={siXiaohongshu.path} />,
  instagram: <BrandIcon path={siInstagram.path} />,
  wechat: <BrandIcon path={siWechat.path} />,
  whatsapp: <BrandIcon path={siWhatsapp.path} />,
  facebook: <BrandIcon path={siFacebook.path} />,
  phone: <Phone className="size-5" aria-hidden />,
  email: <Mail className="size-5" aria-hidden />,
};

/** Resolve where an item goes: a profile URL, tel:/mailto: once confirmed, or a pop-over. */
function targetOf(ch: SocialChannel): string | null {
  if (ch.href) return ch.href;
  if (ch.value && ch.value !== TBC) {
    if (ch.id === "phone") return `tel:${ch.value.replace(/\s+/g, "")}`;
    if (ch.id === "email") return `mailto:${ch.value}`;
  }
  return null;
}

/**
 * Floating contact & social button (all pages). Opens a stack of rainbow-coloured balls:
 * Xiaohongshu, Instagram, phone, WeChat, WhatsApp, Facebook and email.
 * Unconfirmed accounts show a small "coming soon" pop-over instead of a dead link.
 */
export function SocialFab() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState<SocialChannel | null>(null);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = () => {
      setOpen(false);
      setNote(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const noteText = (ch: SocialChannel) => {
    if (ch.id === "wechat") return ch.value && ch.value !== TBC ? `WeChat ID: ${ch.value}` : "WeChat ID coming soon.";
    if (ch.id === "phone") return "Phone number coming soon.";
    if (ch.id === "email") return "Email address coming soon.";
    return "Account coming soon.";
  };

  return (
    <div ref={rootRef} className="fixed right-4 bottom-4 z-40 flex flex-col items-end sm:right-6 sm:bottom-6">
      {note && open && (
        <div role="status" className="mb-3 max-w-[16rem] rounded-xl border border-line bg-white px-4 py-3 text-sm shadow-lift">
          <p className="font-semibold text-ink">{note.label}</p>
          <p className="mt-0.5 text-muted">{noteText(note)}</p>
        </div>
      )}

      <ul
        id={panelId}
        aria-label="Contact Rainbow Air and follow us"
        className={cn(
          "mb-3 flex flex-col items-end gap-2 transition-[opacity,transform] duration-300",
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        {socialChannels.map((ch, i) => {
          const href = targetOf(ch);
          const ball = (
            <span
              className="inline-flex size-11 items-center justify-center rounded-full shadow-[0_8px_20px_-8px_rgb(0_0_0/0.45)] ring-2 ring-white transition-transform duration-200 group-hover:scale-110 sm:size-12"
              style={{ backgroundColor: ch.color, color: ch.ink ?? "#fff" }}
            >
              {icons[ch.id]}
            </span>
          );
          const label = (
            <span className="rounded-full bg-navy-950/85 px-3 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              {ch.label}
            </span>
          );
          const external = href?.startsWith("http");
          return (
            <li key={ch.id} style={{ transitionDelay: open ? `${(socialChannels.length - i) * 25}ms` : "0ms" }}>
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
                  onClick={() => setNote((n) => (n?.id === ch.id ? null : ch))}
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
        className="relative inline-flex size-14 items-center justify-center rounded-full bg-white shadow-[0_10px_28px_-8px_rgb(3_34_79/0.55)] transition-transform duration-200 hover:scale-105"
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full p-[3px] [background:conic-gradient(from_200deg,#e8231b,#f7801e,#fbd40a,#3cb44a,#12a0dc,#1450b4,#4a3aa8,#e8231b)] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]"
        />
        {open ? <X className="size-6 text-navy-900" aria-hidden /> : <MessagesSquare className="size-6 text-navy-900" aria-hidden />}
      </button>
    </div>
  );
}
