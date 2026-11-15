"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { mainNav, site, telHref } from "@/data/site";
import type { Ui } from "@/i18n/ui";
import { quoteHref } from "@/lib/quote";
import { stripLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { LanguageSwitcher, LocalizedLink, useDict } from "@/components/locale/LocaleComponents";

const normalise = (p: string) => (p.endsWith("/") ? p : `${p}/`);

/** Thin utility bar: phone, email and language switcher (keeps the main nav uncluttered). */
function TopBar() {
  return (
    <div className="bg-navy-950 text-white/85">
      <div className="container-page flex h-10 items-center justify-between gap-4 text-[0.82rem]">
        <div className="flex min-w-0 items-center gap-4 sm:gap-6">
          <a href={telHref(site.contact.phone)} className="inline-flex items-center gap-1.5 whitespace-nowrap hover:text-white">
            <Phone className="size-3.5 text-rb-yellow" aria-hidden />
            {site.contact.phone}
          </a>
          <a href={`mailto:${site.contact.email}`} className="hidden items-center gap-1.5 hover:text-white sm:inline-flex">
            <Mail className="size-3.5 text-rb-sky" aria-hidden />
            {site.contact.email}
          </a>
        </div>
        <LanguageSwitcher tone="light" />
      </div>
    </div>
  );
}

const navKey = (href: string) => (Object.entries(navKeys).find(([h]) => h === href)?.[1] ?? "home") as keyof Ui["nav"];
const navKeys: Record<string, keyof Ui["nav"]> = {
  "/": "home",
  "/our-services/": "services",
  "/veu-discount-program/": "veu",
  "/service-areas-projects/": "projects",
  "/about-aftercare/": "about",
  "/contact/": "contact",
};

export function Header() {
  const { ui } = useDict();
  const pathname = normalise(stripLocale(usePathname() || "/"));
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => normalise(href) === pathname;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-lg bg-navy-900 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {ui.common.skipToContent}
      </a>
      <TopBar />
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-[box-shadow,border-color] duration-300 supports-[backdrop-filter]:bg-white/85",
          scrolled ? "border-line shadow-[0_6px_24px_-14px_rgb(3_34_79/0.35)]" : "border-transparent",
        )}
      >
        <div aria-hidden className="rb-full h-[3px] w-full" />
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-3 sm:gap-5 lg:h-20">
          <LocalizedLink href="/" className="shrink-0 rounded-md" aria-label={ui.common.homeAria}>
            <img
              src={site.logo.src}
              alt={ui.common.logoAlt}
              width={site.logo.width}
              height={site.logo.height}
              className="h-10 w-auto sm:h-11 lg:h-[3.1rem]"
            />
          </LocalizedLink>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center">
              {mainNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <LocalizedLink
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative block rounded-md px-2.5 py-2 text-[0.88rem] font-semibold whitespace-nowrap transition-colors 2xl:px-3.5 2xl:text-[0.93rem]",
                        active ? "text-navy-900" : "text-body hover:text-navy-900",
                      )}
                    >
                      {ui.nav[navKey(item.href)]}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-2.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-flame-600 transition-transform duration-300 2xl:inset-x-3.5",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </LocalizedLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href={quoteHref()} size="md" className="h-10 px-3.5 text-sm sm:h-12 sm:px-5 sm:text-[0.95rem]">
              {ui.common.requestQuote}
              <ArrowRight className="hidden size-4 transition-transform group-hover:translate-x-0.5 sm:block" aria-hidden />
            </ButtonLink>

            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-navy-900 hover:bg-navy-50 xl:hidden"
                  aria-label={ui.common.openMenu}
                >
                  <Menu className="size-5" aria-hidden />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-navy-950/45 backdrop-blur-[2px] data-[state=open]:animate-fade-in" />
                <Dialog.Content
                  className="fixed inset-y-0 right-0 z-50 flex w-[min(24rem,88vw)] flex-col bg-white shadow-2xl outline-none data-[state=open]:animate-fade-in"
                  aria-describedby={undefined}
                >
                  <div aria-hidden className="rb-full h-[3px] w-full" />
                  <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5">
                    <Dialog.Title className="font-display text-lg font-bold text-navy-900">{ui.common.menu}</Dialog.Title>
                    <Dialog.Close
                      className="inline-flex size-11 items-center justify-center rounded-lg text-navy-900 hover:bg-navy-50"
                      aria-label={ui.common.closeMenu}
                    >
                      <X className="size-5" aria-hidden />
                    </Dialog.Close>
                  </div>
                  <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
                    <ul className="space-y-1">
                      {mainNav.map((item) => (
                        <li key={item.href}>
                          <LocalizedLink
                            href={item.href}
                            onClick={() => setOpen(false)}
                            aria-current={isActive(item.href) ? "page" : undefined}
                            className={cn(
                              "flex items-center justify-between rounded-lg px-4 py-3.5 text-[1.02rem] font-semibold",
                              isActive(item.href) ? "bg-navy-50 text-navy-900" : "text-ink hover:bg-surface",
                            )}
                          >
                            {ui.nav[navKey(item.href)]}
                            <ArrowRight className="size-4 text-muted" aria-hidden />
                          </LocalizedLink>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex items-center justify-between rounded-lg bg-surface px-4 py-3">
                      <span className="text-sm font-semibold text-ink">{ui.common.language}</span>
                      <LanguageSwitcher />
                    </div>
                  </nav>
                  <div className="border-t border-line p-5">
                    <ButtonLink href={quoteHref()} size="lg" className="w-full" onClick={() => setOpen(false)}>
                      {ui.common.requestQuote}
                    </ButtonLink>
                    <p className="mt-3 text-center text-sm text-muted">{site.slogan}</p>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>
    </>
  );
}
