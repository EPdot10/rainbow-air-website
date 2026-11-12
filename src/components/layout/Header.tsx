"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { mainNav, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = mainNav.map((n) => n.sectionId!).filter(Boolean);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-[box-shadow,border-color] duration-300 supports-[backdrop-filter]:bg-white/85",
        scrolled ? "border-line shadow-[0_6px_24px_-14px_rgb(3_34_79/0.35)]" : "border-transparent",
      )}
    >
      <div aria-hidden className="rb-full h-[3px] w-full" />
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-3 sm:gap-6 lg:h-20">
        <a href="#top" className="shrink-0 rounded-md" aria-label={`${site.name} – back to top`}>
          <img
            src={site.logo.src}
            alt={site.logo.alt}
            width={site.logo.width}
            height={site.logo.height}
            className="h-10 w-auto sm:h-11 lg:h-[3.25rem]"
          />
        </a>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const isActive = active === item.sectionId;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-[0.92rem] font-semibold transition-colors",
                      isActive ? "text-navy-900" : "text-body hover:text-navy-900",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full bg-flame-600 transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="#quote" size="md" className="h-10 px-3.5 text-sm sm:h-12 sm:px-5 sm:text-[0.95rem]">
            Request a Quote
            <ArrowRight className="hidden size-4 transition-transform group-hover:translate-x-0.5 sm:block" aria-hidden />
          </ButtonLink>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-navy-900 hover:bg-navy-50 xl:hidden"
                aria-label="Open menu"
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
                  <Dialog.Title className="font-display text-lg font-bold text-navy-900">Menu</Dialog.Title>
                  <Dialog.Close
                    className="inline-flex size-11 items-center justify-center rounded-lg text-navy-900 hover:bg-navy-50"
                    aria-label="Close menu"
                  >
                    <X className="size-5" aria-hidden />
                  </Dialog.Close>
                </div>
                <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
                  <ul className="space-y-1">
                    {mainNav.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active === item.sectionId ? "location" : undefined}
                          className={cn(
                            "flex items-center justify-between rounded-lg px-4 py-3.5 text-[1.02rem] font-semibold",
                            active === item.sectionId ? "bg-navy-50 text-navy-900" : "text-ink hover:bg-surface",
                          )}
                        >
                          {item.label}
                          <ArrowRight className="size-4 text-muted" aria-hidden />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="border-t border-line p-5">
                  <ButtonLink href="#quote" size="lg" className="w-full" onClick={() => setOpen(false)}>
                    Request a Quote
                  </ButtonLink>
                  <p className="mt-3 text-center text-sm text-muted">{site.slogan}</p>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
