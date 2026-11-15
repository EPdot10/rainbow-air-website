import type { Metadata, Viewport } from "next";
import "@fontsource-variable/outfit";
import "@fontsource-variable/figtree";
import "./globals.css";
import { site } from "@/data/site";
import { resolveImage } from "@/lib/images";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SocialFab } from "@/components/layout/SocialFab";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { LocaleGuard } from "@/components/locale/LocaleComponents";

const ogImage = resolveImage("heroLivingRoom", 1440);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: "%s | Rainbow Air" },
  description: site.seo.description,
  applicationName: site.name,
  // Demo site: keep out of search results until launch (see also public/_headers & robots.txt).
  robots: site.seo.indexable ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: { default: site.seo.title, template: "%s | Rainbow Air" },
    description: site.seo.description,
    images: [{ url: ogImage.src, width: 1440, height: 960, alt: ogImage.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: { default: site.seo.title, template: "%s | Rainbow Air" },
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
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        {/* Set the page language before first paint (Chinese pages live under /zh-hans/ and /zh-hant/). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var p=location.pathname;document.documentElement.lang=p.indexOf('/zh-hans')===0?'zh-Hans':p.indexOf('/zh-hant')===0?'zh-Hant':'en-AU'})()",
          }}
        />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SocialFab />
        <RevealObserver />
        <LocaleGuard />
      </body>
    </html>
  );
}
