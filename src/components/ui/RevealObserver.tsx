"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One shared IntersectionObserver for every [data-reveal] element on the page.
 *
 * Robust against content that appears later (client-rendered parts, re-rendered sections,
 * Safari quirks): newly added [data-reveal] elements are picked up by a MutationObserver,
 * and a safety timer reveals anything still hidden in or above the viewport.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const show = (el: Element) => el.classList.add("is-visible");
    const pending = () => Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));

    if (!("IntersectionObserver" in window) || !("MutationObserver" in window)) {
      pending().forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    const watch = () => pending().forEach((el) => io.observe(el));

    root.classList.add("reveal-ready");
    watch();

    // Elements added after this effect ran would otherwise stay invisible.
    const mo = new MutationObserver((records) => {
      if (records.some((r) => r.addedNodes.length)) watch();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Safety net: anything already scrolled past or on screen must never stay hidden.
    const failsafe = () =>
      pending().forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) show(el);
      });
    const t1 = window.setTimeout(failsafe, 1200);
    const t2 = window.setTimeout(failsafe, 3000);
    window.addEventListener("scroll", failsafe, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("scroll", failsafe);
    };
  }, [pathname]);
  return null;
}
