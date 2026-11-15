"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { turnstileSiteKey } from "@/data/form";
import { useLocale } from "@/components/locale/LocaleComponents";

/** Minimal typing for the Cloudflare Turnstile browser API. */
interface TurnstileApi {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id: string) => void;
}
declare global {
  interface Window {
    turnstile?: TurnstileApi;
    __rbTurnstileLoading?: Promise<void>;
  }
}

const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!window.__rbTurnstileLoading) {
    window.__rbTurnstileLoading = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = SCRIPT;
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => {
        window.__rbTurnstileLoading = undefined;
        reject(new Error("turnstile"));
      };
      document.head.appendChild(s);
    });
  }
  return window.__rbTurnstileLoading;
}

export interface TurnstileHandle {
  reset: () => void;
}

/**
 * Cloudflare Turnstile anti-bot check (free). Usually invisible; only shows a checkbox
 * when Cloudflare wants extra confirmation. The token is verified by the Worker.
 */
export const Turnstile = forwardRef<TurnstileHandle, { onToken: (token: string | null) => void }>(function Turnstile({ onToken }, ref) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const cb = useRef(onToken);
  const locale = useLocale();
  const language = locale === "zh-hans" ? "zh-cn" : locale === "zh-hant" ? "zh-tw" : "en";
  const lang = useRef(language);

  useEffect(() => {
    cb.current = onToken;
  }, [onToken]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      cb.current(null);
      if (widget.current && window.turnstile) window.turnstile.reset(widget.current);
    },
  }));

  useEffect(() => {
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !box.current || !window.turnstile || widget.current) return;
        widget.current = window.turnstile.render(box.current, {
          sitekey: turnstileSiteKey(),
          appearance: "interaction-only",
          theme: "light",
          language: lang.current,
          callback: (t: string) => cb.current(t),
          "expired-callback": () => cb.current(null),
          "error-callback": () => cb.current(null),
        });
      })
      .catch(() => cb.current(null));
    return () => {
      cancelled = true;
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
  }, []);

  return <div ref={box} className="min-h-0 [&:has(iframe)]:mt-4" />;
});
