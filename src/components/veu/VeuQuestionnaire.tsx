"use client";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ImagePlus,
  Loader2,
  Info,
  RotateCcw,
  X,
  XCircle,
} from "lucide-react";
import { cloneElement, useEffect, useId, useRef, useState, type FormEvent, type ReactElement, type ReactNode } from "react";
import { submitEnquiry, submitErrorMessage } from "@/data/form";
import { compressImage } from "@/lib/compressImage";
import { Turnstile, type TurnstileHandle } from "@/components/forms/Turnstile";
import { veuPage } from "@/data/content";
import { routes, site, telHref } from "@/data/site";
import { quoteHref } from "@/lib/quote";
import { cn } from "@/lib/cn";
import { Button, ButtonLink } from "@/components/ui/Button";
import { LocalizedLink } from "@/components/locale/LocaleComponents";

type Answer = "yes" | "no" | "unsure";
type Step = "gas" | "vic" | "disconnect" | "details" | "done";
type Stop = "no-gas" | "not-vic" | "no-disconnect" | null;

const MAX_PHOTOS = 5;
const MAX_MB = 5;
const MAX_BYTES = MAX_MB * 1024 * 1024;

const questions: Record<"gas" | "vic" | "disconnect", { title: string; help?: string; unsure: boolean }> = {
  gas: {
    title: "Do you currently have gas ducted heating?",
    help: "A gas heater (usually in the roof, under the floor or outside) that blows warm air through vents in several rooms.",
    unsure: true,
  },
  vic: { title: "Is the property in Victoria?", unsure: false },
  disconnect: {
    title: "Do you agree to have your existing gas ducted heater disconnected as part of the upgrade?",
    help: "This is a VEU program requirement for the gas-heating replacement discount.",
    unsure: false,
  },
};

const stopCopy: Record<Exclude<Stop, null>, { title: string; body: string }> = {
  "no-gas": {
    title: "This VEU upgrade is for homes with gas ducted heating",
    body: "This discount check is for replacing gas ducted heating. You may still be eligible for other VEU heating and cooling discounts, or we can help with a new installation.",
  },
  "not-vic": {
    title: "VEU is a Victorian program",
    body: "The Victorian Energy Upgrades program only applies to properties in Victoria, so this discount isn't available for your property.",
  },
  "no-disconnect": {
    title: "Disconnection is required for this discount",
    body: "The VEU gas-heating replacement discount requires the existing gas ducted heater to be disconnected. Without it, this discount doesn't apply – but we can still quote a standard installation.",
  },
};

interface Details {
  address: string;
  suburb: string;
  postcode: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  consent: boolean;
}
const emptyDetails: Details = { address: "", suburb: "", postcode: "", name: "", phone: "", email: "", notes: "", consent: false };
type DetailErrors = Partial<Record<keyof Details | "photos", string>>;

function validate(d: Details): DetailErrors {
  const e: DetailErrors = {};
  if (d.address.trim().length < 4) e.address = "Please enter the street address.";
  if (d.suburb.trim().length < 2) e.suburb = "Please enter the suburb.";
  if (!/^3\d{3}$/.test(d.postcode.trim())) e.postcode = "Victorian postcodes are 4 digits starting with 3.";
  if (d.name.trim().length < 2) e.name = "Please enter your name.";
  const digits = d.phone.replace(/[^\d]/g, "");
  if (!d.phone.trim()) e.phone = "Please enter a contact number.";
  else if (!/^[\d\s()+-]+$/.test(d.phone) || digits.length < 8 || digits.length > 12)
    e.phone = "Please enter a valid Australian phone number, e.g. 0412 345 678.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Please enter a valid email address.";
  if (!d.consent) e.consent = "Please confirm so we can contact you about this enquiry.";
  return e;
}

const fieldOrder: (keyof Details)[] = ["address", "suburb", "postcode", "name", "phone", "email", "consent"];

interface Photo {
  file: File;
  url: string;
}

/**
 * VEU eligibility questionnaire – sends answers, photos and floor plan by email via /api/enquiry.
 * Q1 gas ducted → Q2 Victoria → Q3 agree to disconnect → address, photos & contact details.
 * Any "No" stops the flow immediately and hides the remaining questions.
 */
export function VeuQuestionnaire() {
  const uid = useId();
  const [step, setStep] = useState<Step>("gas");
  const [answers, setAnswers] = useState<Partial<Record<"gas" | "vic" | "disconnect", Answer>>>({});
  const [stop, setStop] = useState<Stop>(null);
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [errors, setErrors] = useState<DetailErrors>({});
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const [floorPlan, setFloorPlan] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const turnstile = useRef<TurnstileHandle>(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.closest("section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, stop]);

  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p.url)), [photos]);

  const order: Step[] = ["gas", "vic", "disconnect", "details"];
  const progressIndex = step === "done" ? 4 : order.indexOf(step);

  const answer = (q: "gas" | "vic" | "disconnect", a: Answer) => {
    setAnswers((prev) => ({ ...prev, [q]: a }));
    if (a === "unsure") return; // show explanation, stay on this question
    if (a === "no") {
      setStop(q === "gas" ? "no-gas" : q === "vic" ? "not-vic" : "no-disconnect");
      return;
    }
    setStop(null);
    setStep(q === "gas" ? "vic" : q === "vic" ? "disconnect" : "details");
  };

  const back = () => {
    if (stop) {
      setStop(null);
      return;
    }
    const i = order.indexOf(step);
    if (i > 0) setStep(order[i - 1]);
  };

  const restart = () => {
    setStep("gas");
    setAnswers({});
    setStop(null);
    setDetails(emptyDetails);
    setErrors({});
    setPhotos([]);
    setFloorPlan(null);
    setPhotoError(null);
    setSendError(null);
  };

  const addPhotos = async (files: FileList | null) => {
    if (!files) return;
    setPhotoError(null);
    const next = [...photos];
    for (const original of Array.from(files)) {
      if (!original.type.startsWith("image/") && !/\.(heic|heif)$/i.test(original.name)) {
        setPhotoError("Please choose image files (JPG, PNG or HEIC).");
        continue;
      }
      if (next.length >= MAX_PHOTOS) {
        setPhotoError(`You can add up to ${MAX_PHOTOS} photos.`);
        break;
      }
      // Large phone photos are resized in the browser before upload (keeps emails small and free).
      const f = await compressImage(original);
      if (f.size > MAX_BYTES) {
        setPhotoError(`Each photo must be under ${MAX_MB} MB.`);
        continue;
      }
      next.push({ file: f, url: URL.createObjectURL(f) });
    }
    setPhotos(next);
  };

  const addFloorPlan = async (files: FileList | null) => {
    const original = files?.[0];
    if (!original) return;
    setPhotoError(null);
    const isPdf = original.type === "application/pdf" || /\.pdf$/i.test(original.name);
    if (!isPdf && !original.type.startsWith("image/") && !/\.(heic|heif)$/i.test(original.name)) {
      setPhotoError("The floor plan can be a photo, an image or a PDF.");
      return;
    }
    const f = isPdf ? original : await compressImage(original, 2400);
    if (f.size > MAX_BYTES) {
      setPhotoError(`The floor plan must be under ${MAX_MB} MB.`);
      return;
    }
    setFloorPlan(f);
  };

  const removePhoto = (i: number) => {
    URL.revokeObjectURL(photos[i].url);
    setPhotos(photos.filter((_, k) => k !== i));
  };

  const set = (f: keyof Details) => (e: { target: { value: string } }) => {
    const next = { ...details, [f]: e.target.value };
    setDetails(next);
    if (errors[f]) setErrors((prev) => ({ ...prev, [f]: validate(next)[f] }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(details);
    setErrors(errs);
    const first = fieldOrder.find((k) => errs[k]);
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    if (!token) {
      setSendError("Please wait a moment for the security check to finish, then try again.");
      return;
    }
    setSending(true);
    setSendError(null);
    const data = new FormData();
    data.set("kind", "veu");
    data.set("gas", "Yes");
    data.set("vic", "Yes");
    data.set("disconnect", "Yes");
    for (const k of ["address", "suburb", "postcode", "name", "phone", "email", "notes"] as const) data.set(k, details[k]);
    data.set("consent", details.consent ? "Yes" : "No");
    photos.forEach((p) => data.append("photos", p.file, p.file.name));
    if (floorPlan) data.append("floorPlan", floorPlan, floorPlan.name);
    data.set("website", honeypot);
    data.set("cf-turnstile-response", token);
    const result = await submitEnquiry(data);
    turnstile.current?.reset();
    setSending(false);
    if (result.ok) setStep("done");
    else setSendError(submitErrorMessage(result.error));
  };

  const q = step === "gas" || step === "vic" || step === "disconnect" ? step : null;

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-lift sm:p-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-muted">
          {stop ? "Result" : step === "done" ? "Sent" : step === "details" ? "Step 4 of 4 – Your details" : `Question ${progressIndex + 1} of 3`}
        </p>
      </div>
      <div className="mt-3 flex gap-1.5" aria-hidden>
        {order.map((s, i) => (
          <span
            key={s}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-300",
              stop && i === progressIndex ? "bg-red-400" : i <= progressIndex ? "bg-navy-900" : "bg-navy-900/10",
            )}
          />
        ))}
      </div>

      {/* ── Stop ── */}
      {stop && (
        <div className="mt-8" role="status" aria-live="polite">
          <XCircle className="size-10 text-red-500" aria-hidden />
          <h3 ref={headingRef} tabIndex={-1} className="mt-4 text-2xl font-bold outline-none">
            {stopCopy[stop].title}
          </h3>
          <p className="mt-3 max-w-2xl leading-relaxed">{stopCopy[stop].body}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {stop !== "not-vic" && (
              <ButtonLink href={routes.services} size="lg">
                View Our Services
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            )}
            <ButtonLink href={quoteHref({ type: "general" })} size="lg" variant="outline">
              Contact Us
            </ButtonLink>
            <Button type="button" variant="link" size="lg" onClick={back}>
              <ArrowLeft className="size-4" aria-hidden />
              Change my answer
            </Button>
          </div>
        </div>
      )}

      {/* ── Questions ── */}
      {!stop && q && (
        <fieldset className="mt-8">
          <legend className="w-full">
            <h3 ref={headingRef} tabIndex={-1} className="text-[1.45rem] leading-snug font-bold outline-none sm:text-2xl">
              {questions[q].title}
            </h3>
          </legend>
          {questions[q].help && <p className="mt-2 max-w-2xl text-[0.97rem] text-muted">{questions[q].help}</p>}
          <div className={cn("mt-6 grid gap-3", questions[q].unsure ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
            {(questions[q].unsure ? (["yes", "no", "unsure"] as const) : (["yes", "no"] as const)).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => answer(q, a)}
                aria-pressed={answers[q] === a}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border-2 px-5 py-4 text-[1.02rem] font-semibold transition-colors",
                  answers[q] === a ? "border-navy-900 bg-navy-50 text-navy-900" : "border-line text-ink hover:border-navy-900/40",
                )}
              >
                {a === "yes" ? <CheckCircle2 className="size-5 text-green-600" aria-hidden /> : a === "no" ? <XCircle className="size-5 text-red-500" aria-hidden /> : <HelpCircle className="size-5 text-sky-600" aria-hidden />}
                {a === "yes" ? "Yes" : a === "no" ? "No" : "Not sure"}
              </button>
            ))}
          </div>

          {q === "gas" && answers.gas === "unsure" && (
            <div className="mt-6 rounded-2xl bg-sky-50 p-5 sm:p-6" role="status" aria-live="polite">
              <p className="flex items-center gap-2 font-bold text-navy-900">
                <Info className="size-5 text-sky-600" aria-hidden />
                How to tell if you have gas ducted heating
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.97rem] text-navy-900/85">
                <li>Warm air comes out of vents in the floor or ceiling of several rooms.</li>
                <li>There is one wall controller (thermostat) for the whole home.</li>
                <li>A gas heater unit sits in the roof space, under the house or outside against a wall, with a gas pipe and flue.</li>
                <li>Your gas bill is much higher in winter.</li>
              </ul>
              <p className="mt-3 text-[0.97rem] text-navy-900/85">Still not sure? Send us a photo of your heater and vents and we’ll check for you.</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button type="button" onClick={() => answer("gas", "yes")}>
                  Yes, I have this
                </Button>
                <ButtonLink href={quoteHref({ type: "veu", item: "Not sure if I have gas ducted heating – please check" })} variant="outline">
                  Ask us to check
                </ButtonLink>
              </div>
            </div>
          )}

          {q !== "gas" && (
            <button type="button" onClick={back} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink">
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </button>
          )}
        </fieldset>
      )}

      {/* ── Details ── */}
      {!stop && step === "details" && (
        <form noValidate onSubmit={submit} className="mt-8" aria-labelledby={`${uid}-details-title`}>
          <h3 id={`${uid}-details-title`} ref={headingRef} tabIndex={-1} className="text-[1.45rem] font-bold outline-none sm:text-2xl">
            Great – your home may be suitable. Tell us about the property.
          </h3>
          <p className="mt-2 text-[0.97rem] text-muted">We’ll review your answers and photos, then contact you to confirm eligibility and arrange a quote.</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-6">
            <TextField id={`${uid}-address`} label="Street address" required error={errors.address} className="sm:col-span-6">
              <input type="text" autoComplete="street-address" value={details.address} onChange={set("address")} />
            </TextField>
            <TextField id={`${uid}-suburb`} label="Suburb" required error={errors.suburb} className="sm:col-span-4">
              <input type="text" autoComplete="address-level2" value={details.suburb} onChange={set("suburb")} />
            </TextField>
            <TextField id={`${uid}-postcode`} label="Postcode" required error={errors.postcode} className="sm:col-span-2">
              <input type="text" inputMode="numeric" maxLength={4} autoComplete="postal-code" placeholder="3xxx" value={details.postcode} onChange={set("postcode")} />
            </TextField>

            <div className="sm:col-span-6">
              <p className="text-sm font-semibold text-ink">
                Photos of your heating equipment <span className="ml-1 text-xs font-normal text-muted">Optional – up to {MAX_PHOTOS} photos, max {MAX_MB} MB each</span>
              </p>
              <p className="mt-1 text-sm text-muted">e.g. the gas heater unit, its compliance label, the wall controller and a floor or ceiling vent.</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {photos.map((p, i) => (
                  <div key={p.url} className="relative size-24 overflow-hidden rounded-xl border border-line">
                    <img src={p.url} alt={`Photo ${i + 1}: ${p.file.name}`} className="size-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 inline-flex size-7 items-center justify-center rounded-full bg-navy-950/75 text-white hover:bg-navy-950"
                      aria-label={`Remove photo ${i + 1}`}
                    >
                      <X className="size-4" aria-hidden />
                    </button>
                  </div>
                ))}
                {photos.length < MAX_PHOTOS && (
                  <label className="flex size-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-navy-900/20 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-900/50 hover:bg-navy-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sky-500">
                    <ImagePlus className="size-6" aria-hidden />
                    Add
                    <input type="file" accept="image/*,.heic,.heif" multiple className="sr-only" onChange={(e) => { void addPhotos(e.target.files); e.target.value = ""; }} />
                  </label>
                )}
              </div>
              <div className="mt-5 rounded-xl bg-sky-50 p-4">
                <p className="text-sm font-semibold text-ink">
                  Floor plan of your home <span className="ml-1 text-xs font-normal text-muted">Recommended – photo, image or PDF, max {MAX_MB} MB</span>
                </p>
                <p className="mt-1 text-sm text-muted">A floor plan (even a phone photo of a sketch or real-estate plan) helps us plan duct and unit locations and quote accurately.</p>
                {floorPlan ? (
                  <p className="mt-3 flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-green-600" aria-hidden />
                    <span className="min-w-0 truncate font-semibold text-ink">{floorPlan.name}</span>
                    <button type="button" onClick={() => setFloorPlan(null)} className="font-semibold text-muted underline hover:text-ink">
                      Remove
                    </button>
                  </p>
                ) : (
                  <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-navy-900/20 bg-white px-4 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-900/50 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sky-500">
                    <ImagePlus className="size-4" aria-hidden />
                    Add floor plan
                    <input type="file" accept="image/*,application/pdf,.heic,.heif" className="sr-only" onChange={(e) => { void addFloorPlan(e.target.files); e.target.value = ""; }} />
                  </label>
                )}
              </div>
              {photoError && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-red-700" role="alert">
                  <AlertCircle className="size-3.5" aria-hidden />
                  {photoError}
                </p>
              )}
            </div>

            <TextField id={`${uid}-name`} label="Name" required error={errors.name} className="sm:col-span-6">
              <input type="text" autoComplete="name" value={details.name} onChange={set("name")} />
            </TextField>
            <TextField id={`${uid}-phone`} label="Contact number" required error={errors.phone} className="sm:col-span-3">
              <input type="tel" inputMode="tel" autoComplete="tel" placeholder="04xx xxx xxx" value={details.phone} onChange={set("phone")} />
            </TextField>
            <TextField id={`${uid}-email`} label="Email" required error={errors.email} className="sm:col-span-3">
              <input type="email" autoComplete="email" value={details.email} onChange={set("email")} />
            </TextField>
            <TextField id={`${uid}-notes`} label="Anything else we should know?" hint="Optional" className="sm:col-span-6">
              <textarea rows={3} value={details.notes} onChange={set("notes")} className="h-auto py-3" />
            </TextField>

            <div className="sm:col-span-6">
              <label className="flex cursor-pointer items-start gap-3 text-[0.95rem]">
                <input
                  id={`${uid}-consent`}
                  type="checkbox"
                  checked={details.consent}
                  onChange={(e) => {
                    const next = { ...details, consent: e.target.checked };
                    setDetails(next);
                    if (errors.consent) setErrors((p) => ({ ...p, consent: validate(next).consent }));
                  }}
                  aria-invalid={errors.consent ? true : undefined}
                  className="mt-1 size-4 shrink-0 accent-navy-900"
                />
                <span>
                  I agree to Rainbow Air contacting me about this enquiry and using my details as described in the{" "}
                  <LocalizedLink href={routes.privacy} className="font-semibold underline underline-offset-2">
                    Privacy Policy
                  </LocalizedLink>
                  .
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
                  <AlertCircle className="size-3.5" aria-hidden />
                  {errors.consent}
                </p>
              )}
            </div>
          </div>

          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Website
              <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </label>
          </div>
          <Turnstile ref={turnstile} onToken={setToken} />
          {sendError && (
            <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
              {sendError}
            </p>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={back} className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-muted hover:text-ink">
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </button>
            <Button type="submit" size="lg" className="sm:min-w-[14rem]" disabled={sending}>
              {sending && <Loader2 className="size-4 animate-spin" aria-hidden />}
              {sending ? "Sending…" : "Submit Enquiry"}
              {!sending && <ArrowRight className="size-4" aria-hidden />}
            </Button>
          </div>
          <Disclaimer />
        </form>
      )}

      {/* ── Done (sent) ── */}
      {step === "done" && (
        <div className="mt-8" role="status" aria-live="polite">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-green-50 text-green-700">
            <CheckCircle2 className="size-6" aria-hidden />
          </span>
          <h3 ref={headingRef} tabIndex={-1} className="mt-4 text-2xl font-bold outline-none">
            Thank you – we’ve received your enquiry
          </h3>
          <p className="mt-3 max-w-2xl leading-relaxed">
            Our team will review your answers and photos and contact you to confirm eligibility and arrange a quote. Questions in the
            meantime? Call{" "}
            <a className="font-semibold underline" href={telHref(site.contact.phone)}>
              {site.contact.phone}
            </a>
            .
          </p>
          <dl className="mt-5 grid gap-x-6 gap-y-2 rounded-xl bg-surface p-4 text-sm sm:grid-cols-2">
            {(
              [
                ["Gas ducted heating", "Yes"],
                ["Property in Victoria", "Yes"],
                ["Agrees to disconnection", "Yes"],
                ["Suburb / postcode", `${details.suburb} ${details.postcode}`],
                ["Photos attached", String(photos.length)],
                ["Floor plan", floorPlan ? "Attached" : "Not attached"],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <dt className="text-muted">{k}</dt>
                <dd className="font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <Button type="button" variant="outline" className="mt-7" onClick={restart}>
            <RotateCcw className="size-4" aria-hidden />
            Start again
          </Button>
          <Disclaimer />
        </div>
      )}
    </div>
  );
}

function Disclaimer() {
  return (
    <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
      <strong className="font-semibold text-ink">{veuPage.disclaimerTitle}</strong> {veuPage.disclaimer}
    </p>
  );
}

function TextField({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  const child = children as ReactElement<Record<string, unknown>>;
  const base =
    "block h-12 w-full rounded-lg border bg-white px-3.5 text-[0.98rem] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] focus:border-sky-500 focus:shadow-[0_0_0_3px_rgb(26_139_224/0.18)] focus:outline-none";
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required && (
          <span className="text-flame-600" aria-hidden>
            {" "}
            *
          </span>
        )}
        {hint && <span className="ml-2 text-xs font-normal text-muted">{hint}</span>}
      </label>
      <div className="mt-1.5">
        {cloneWith(child, {
          id,
          "aria-invalid": error ? true : undefined,
          "aria-required": required || undefined,
          "aria-describedby": error ? `${id}-error` : undefined,
          className: cn(base, error ? "border-red-400" : "border-line hover:border-navy-900/30", child.props.className as string | undefined),
        })}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

function cloneWith(el: ReactElement<Record<string, unknown>>, props: Record<string, unknown>) {
  return cloneElement(el, props);
}
