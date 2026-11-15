"use client";

import { Mail, Phone } from "lucide-react";
import { siFacebook, siWechat, siWhatsapp, siXiaohongshu } from "simple-icons";
import { useState, type ReactNode } from "react";
import { socialChannels, telHref, type SocialChannel } from "@/data/site";
import { TBC } from "@/data/types";
import { cn } from "@/lib/cn";
import { fmt } from "@/i18n";
import type { Ui } from "@/i18n/ui";
import { useDict } from "@/components/locale/LocaleComponents";

/** Official platform glyphs from simple-icons (CC0), rendered single-colour. */
function BrandIcon({ path, className }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={path} />
    </svg>
  );
}

export function channelIcon(id: SocialChannel["id"], className = "size-[1.3rem]"): ReactNode {
  switch (id) {
    case "rednote":
      // RedNote (Xiaohongshu) – same platform mark.
      return <BrandIcon path={siXiaohongshu.path} className={className} />;
    case "wechat":
      return <BrandIcon path={siWechat.path} className={className} />;
    case "whatsapp":
      return <BrandIcon path={siWhatsapp.path} className={className} />;
    case "facebook":
      return <BrandIcon path={siFacebook.path} className={className} />;
    case "phone":
      return <Phone className={className} aria-hidden />;
    case "email":
      return <Mail className={className} aria-hidden />;
  }
}

/** Where an item goes: a profile URL, tel:/mailto: from its value, or null (not available yet). */
export function channelTarget(ch: SocialChannel): string | null {
  if (ch.href) return ch.href;
  if (ch.value && ch.value !== TBC) {
    if (ch.id === "phone") return telHref(ch.value);
    if (ch.id === "email") return `mailto:${ch.value}`;
  }
  return null;
}

export function channelNote(ch: SocialChannel, ui: Ui): string {
  if (ch.id === "wechat") return ch.value && ch.value !== TBC ? fmt(ui.social.wechatId, { id: ch.value }) : ui.social.wechatComingSoon;
  return ui.social.accountComingSoon;
}

export const channelLabel = (ch: SocialChannel, ui: Ui) => ui.social.labels[ch.id];

/**
 * Row of social / contact icons for the Contact page.
 * Linked channels open in a new tab; channels without details are grey with "coming soon".
 */
export function SocialRow({ size = "lg", tone = "dark", className }: { size?: "lg" | "sm"; tone?: "dark" | "light"; className?: string }) {
  const [note, setNote] = useState<string | null>(null);
  const { ui } = useDict();
  const big = size === "lg";
  return (
    <div className={className}>
      <ul className={cn("flex flex-wrap", big ? "gap-3" : "gap-1.5")} aria-label={ui.social.listLabel}>
        {socialChannels.map((ch) => {
          const href = channelTarget(ch);
          const external = href?.startsWith("http");
          const ball = cn(
            "inline-flex items-center justify-center rounded-full transition-[transform,box-shadow,background-color] duration-200",
            big ? "size-12 sm:size-14" : "size-9",
          );
          return (
            <li key={ch.id} className="flex flex-col items-center gap-1.5">
              {href ? (
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={external ? `${channelLabel(ch, ui)} ${ui.social.newTab}` : channelLabel(ch, ui)}
                  title={channelLabel(ch, ui)}
                  className={cn(ball, "shadow-[0_8px_20px_-10px_rgb(0_0_0/0.5)] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgb(0_0_0/0.55)]")}
                  style={{ backgroundColor: ch.color, color: ch.ink ?? "#fff" }}
                >
                  {channelIcon(ch.id, big ? "size-6" : "size-[1.1rem]")}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setNote(note === ch.id ? null : ch.id)}
                  aria-label={`${channelLabel(ch, ui)} – ${ui.social.comingSoon}`}
                  title={`${channelLabel(ch, ui)} – ${ui.social.comingSoon}`}
                  className={cn(ball, "shadow-[0_8px_20px_-10px_rgb(0_0_0/0.5)] hover:-translate-y-0.5")}
                  style={{ backgroundColor: ch.color, color: ch.ink ?? "#fff" }}
                >
                  {channelIcon(ch.id, big ? "size-6" : "size-[1.1rem]")}
                </button>
              )}
              {big && (
                <span className={cn("text-[0.72rem] font-semibold", tone === "dark" ? "text-muted" : "text-white/70")}>
                  {channelLabel(ch, ui)}
                </span>
              )}
            </li>
          );
        })}
      </ul>
      {note && (
        <p role="status" className={cn("mt-3 text-sm", tone === "dark" ? "text-muted" : "text-white/75")}>
          {channelLabel(socialChannels.find((c) => c.id === note)!, ui)}: {channelNote(socialChannels.find((c) => c.id === note)!, ui)}
        </p>
      )}
    </div>
  );
}
