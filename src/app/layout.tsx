import type { Metadata, Viewport } from "next";
import "@fontsource-variable/outfit";
import "@fontsource-variable/figtree";
import "./globals.css";
import { site } from "@/data/site";
import { resolveImage } from "@/lib/images";

const ogImage = resolveImage("heroLivingRoom", 1440);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seo.title,
  description: site.seo.description,
  applicationName: site.name,
  // Demo site: keep out of search results until launch (see also public/_headers & robots.txt).
  robots: site.seo.indexable ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    images: [{ url: ogImage.src, width: 1440, height: 960, alt: ogImage.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [ogImage.src],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#03224f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-navy-900 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
