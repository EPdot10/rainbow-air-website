import Link from "next/link";
import { site } from "@/data/site";

/** Safety net for mistyped URLs – sends visitors back to the homepage rather than a bare 404. */
export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-surface px-6 text-center">
      <img src={site.logo.src} alt={site.logo.alt} width={site.logo.width} height={site.logo.height} className="h-16 w-auto" />
      <h1 className="text-3xl font-bold">This page is coming soon</h1>
      <p className="max-w-md text-muted">
        We’re building out the rest of the Rainbow Air website. In the meantime, everything you need is on the homepage.
      </p>
      <Link href="/" className="rounded-lg bg-flame-600 px-6 py-3 font-semibold text-white hover:bg-flame-700">
        Go to the homepage
      </Link>
    </main>
  );
}
