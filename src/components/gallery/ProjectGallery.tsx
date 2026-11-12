"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Expand, MapPin, X } from "lucide-react";
import { useCallback, useState } from "react";
import { illustrativeLabel, projects, sectionCopy } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { cn } from "@/lib/cn";

export function ProjectGallery() {
  const c = sectionCopy.projects;
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const current = index !== null ? projects[index] : null;

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + projects.length) % projects.length)),
    [],
  );

  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-surface py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="projects-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
          <p className="flex max-w-sm items-start gap-2.5 text-[0.95rem] text-body lg:text-right">
            <MapPin className="mt-0.5 size-[1.1rem] shrink-0 text-flame-600 lg:order-last" aria-hidden />
            {c.serviceArea}
          </p>
        </div>

        <ul className="mt-12 grid auto-rows-[15rem] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[16rem] lg:grid-cols-3 lg:auto-rows-[17.5rem] lg:gap-5">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 3) * 0.06} className={cn(p.wide && "lg:col-span-2")}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group/tile relative block h-full w-full overflow-hidden rounded-2xl bg-navy-100 text-left"
                aria-label={`View larger: ${p.title} (${illustrativeLabel})`}
              >
                <SmartImage
                  image={p.image}
                  sizes={p.wide ? "(min-width:1024px) 60vw, (min-width:640px) 50vw, 100vw" : "(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw"}
                  maxWidth={1440}
                  className="transition-transform duration-700 ease-out group-hover/tile:scale-[1.05]"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
                <DemoBadge tone="dark" className="absolute top-3 left-3">
                  {illustrativeLabel}
                </DemoBadge>
                <span
                  aria-hidden
                  className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-navy-900 opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100"
                >
                  <Expand className="size-4" />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-white/70">{p.category}</span>
                  <span className="mt-1 block font-display text-lg font-semibold text-white">{p.title}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>

        <p className="mt-6 text-sm text-muted">{c.note}</p>
      </div>

      <Dialog.Root open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-navy-950/90 data-[state=open]:animate-fade-in" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 outline-none sm:p-10"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") step(1);
              if (e.key === "ArrowLeft") step(-1);
            }}
          >
            {current && (
              <>
                <div className="flex w-full max-w-6xl items-center justify-between pb-3 text-white">
                  <div>
                    <Dialog.Title className="font-display text-lg font-semibold">{current.title}</Dialog.Title>
                    <Dialog.Description className="text-sm text-white/65">
                      {illustrativeLabel} · {index! + 1} / {projects.length}
                    </Dialog.Description>
                  </div>
                  <Dialog.Close
                    className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                    aria-label="Close image viewer"
                  >
                    <X className="size-5" aria-hidden />
                  </Dialog.Close>
                </div>
                <div className="relative aspect-[3/2] max-h-[78svh] w-full max-w-6xl overflow-hidden rounded-xl bg-navy-900">
                  <SmartImage key={current.id} image={current.image} fit="contain" sizes="90vw" maxWidth={2400} priority />
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-6" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-6" aria-hidden />
                  </button>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
