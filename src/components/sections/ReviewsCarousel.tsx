"use client";

import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { cn } from "@/lib/cn";
import { fmt } from "@/i18n";
import { useDict } from "@/components/locale/LocaleComponents";

export interface CarouselReview {
  id: string;
  name: string;
  detail: string;
  quote: string;
  avatar: string;
}

const AUTOPLAY_MS = 5000;

function usePerView() {
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perView;
}

/**
 * Auto-sliding review carousel. Drag with mouse or swipe with a finger; pauses on hover,
 * while pressed, when the tab is hidden and when the visitor prefers reduced motion.
 */
export function ReviewsCarousel({ reviews }: { reviews: CarouselReview[] }) {
  const perView = usePerView();
  const { ui } = useDict();
  const maxIndex = Math.max(0, reviews.length - perView);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  const moved = useRef(false);

  const current = Math.min(index, maxIndex);
  const go = useCallback((i: number) => setIndex(i < 0 ? maxIndex : i > maxIndex ? 0 : i), [maxIndex]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reduced || dragging || maxIndex === 0) return;
    const t = window.setInterval(() => {
      if (document.visibilityState === "visible") setIndex((i) => (Math.min(i, maxIndex) >= maxIndex ? 0 : i + 1));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [paused, reduced, dragging, maxIndex]);

  const onPointerDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    start.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
    moved.current = false;
    setDragging(true);
  };
  const onPointerMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (!start.current || start.current.id !== e.pointerId) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    if (!moved.current && Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
      moved.current = true;
      viewport.current?.setPointerCapture(e.pointerId);
    }
    if (moved.current) setDragX(dx);
  };
  const endDrag = (e: RPointerEvent<HTMLDivElement>) => {
    if (!start.current || start.current.id !== e.pointerId) return;
    const width = viewport.current?.clientWidth ?? 1;
    const threshold = (width / perView) * 0.2;
    if (moved.current && Math.abs(dragX) > threshold) go(current + (dragX < 0 ? 1 : -1));
    start.current = null;
    setDragX(0);
    setDragging(false);
  };

  const slideWidth = 100 / perView;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ui.home.reviewsRegion}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={viewport}
        className={cn("-mx-3 cursor-grab touch-pan-y overflow-hidden select-none", dragX !== 0 && "cursor-grabbing")}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (moved.current) e.preventDefault();
        }}
      >
        <ul
          className="flex"
          style={{
            transform: `translateX(calc(${-current * slideWidth}% + ${dragX}px))`,
            transition: dragging ? "none" : reduced ? "transform 0s" : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {reviews.map((r, i) => (
            <li
              key={r.id}
              className="shrink-0 px-3"
              style={{ flexBasis: `${slideWidth}%` }}
              aria-roledescription="slide"
              aria-label={fmt(ui.home.slideOf, { n: i + 1, total: reviews.length })}
              aria-hidden={i < current || i >= current + perView}
            >
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card">
                <span className="flex gap-0.5 text-rb-yellow" aria-hidden>
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="size-4 fill-current" />
                  ))}
                </span>
                <Quote className="mt-5 size-7 text-navy-100" aria-hidden />
                <blockquote className="mt-2 flex-1 text-[1.02rem] leading-relaxed text-ink">“{r.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <img src={r.avatar} alt="" width={44} height={44} draggable={false} className="size-11 rounded-full" />
                  <span>
                    <span className="block font-semibold text-ink">{r.name}</span>
                    <span className="block text-sm text-muted">{r.detail}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(current - 1)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-navy-900 shadow-card transition-colors hover:bg-navy-50"
          aria-label={ui.home.prevReviews}
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={fmt(ui.home.showReviews, { n: i + 1 })}
              aria-current={i === current}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                i === current ? "w-7 bg-navy-900" : "w-2.5 bg-navy-900/20 hover:bg-navy-900/40",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(current + 1)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-navy-900 shadow-card transition-colors hover:bg-navy-50"
          aria-label={ui.home.nextReviews}
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
