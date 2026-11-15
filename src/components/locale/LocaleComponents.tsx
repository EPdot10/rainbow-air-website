"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ComponentProps } from "react";
import {
  LOCALE_STORAGE_KEY,
  localeFromPath,
  localeLabels,
  locales,
  localizeHref,
  stripLocale,
  type Locale,
} from "@/lib/locale";
import { cn } from "@/lib/cn";
import { dict } from "@/i18n";

export function useLocale(): Locale {
  return localeFromPath(usePathname());
}

/** Dictionary for the current page language (client components). */
export function useDict() {
  return dict(useLocale());
}

function readStoredLocale(): Locale | null {
  try {
    const v = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return (locales as readonly string[]).includes(v ?? "") ? (v as Locale) : null;
  } catch {
    return null;
  }
}

function storeLocale(l: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, l);
  } catch {
    /* storage unavailable – the URL prefix still keeps the language */
  }
}

/** next/link that keeps the visitor's current language prefix on internal links. */
export function LocalizedLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const locale = useLocale();
  return <Link href={localizeHref(href, locale)} {...props} />;
}

/** EN / 简 / 繁 buttons. Remembers the choice and moves to the same page in the new language. */
export function LanguageSwitcher({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const locale = useLocale();
  const { ui } = dict(locale);
  const pathname = usePathname() || "/";
  const router = useRouter();

  const choose = (l: Locale) => {
    storeLocale(l);
    if (l === locale) return;
    const { search, hash } = window.location;
    router.push(localizeHref(stripLocale(pathname), l) + search + hash);
  };

  return (
    <div role="group" aria-label={ui.common.language} className={cn("inline-flex items-center rounded-lg p-0.5", tone === "dark" ? "bg-navy-50" : "bg-white/10", className)}>
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={localeLabels[l].htmlLang}
            onClick={() => choose(l)}
            aria-pressed={active}
            aria-label={localeLabels[l].name}
            title={localeLabels[l].name}
            className={cn(
              "min-w-9 rounded-md px-2 py-1.5 text-[0.82rem] font-semibold transition-colors",
              active
                ? tone === "dark"
                  ? "bg-white text-navy-900 shadow-sm"
                  : "bg-white text-navy-900"
                : tone === "dark"
                  ? "text-muted hover:text-navy-900"
                  : "text-white/75 hover:text-white",
            )}
          >
            {localeLabels[l].short}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Keeps the language consistent:
 *  - sets <html lang> for the current locale;
 *  - if the visitor previously chose Chinese and lands on an English URL (typed, bookmarked or
 *    an external link), sends them to the same page in their chosen language.
 */
export function LocaleGuard() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const locale = localeFromPath(pathname);

  useEffect(() => {
    document.documentElement.lang = localeLabels[locale].htmlLang;
    const stored = readStoredLocale();
    if (stored && stored !== "en" && locale === "en") {
      const { search, hash } = window.location;
      router.replace(localizeHref(pathname, stored) + search + hash);
    }
  }, [locale, pathname, router]);

  return null;
}
